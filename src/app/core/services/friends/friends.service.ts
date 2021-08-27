import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { User } from 'src/app/features/store/models/User';
import { friendsUrl, invitesUrl } from '../../constants/urls';
import { Store } from '../../stores/defaultStore';

@Injectable({
  providedIn: 'root'
})
export class FriendsService extends Store<User> {
  constructor(
    private readonly http: HttpClient,
  ) {
    super();
  }

  public getFriends$(): Observable<User[]> {
    this.getFriendsFromServer$().subscribe(entities => {
      this.setState({entities: this.transformArray(entities, '_id')});
    });

    return this.getState$()
      .pipe(
        map(({entities}) => Object.values(entities)),
      );
  }

  public acceptInvite$(friend: User): Observable<Object> {
    const { inviteId, _id: friendId } = friend;
    const {entities: friends} = this.state$.getValue();
    const state = {
      entities: {
        ...friends,
        [friendId]: friend,
      },
    };
    return this.http.put(invitesUrl, {inviteId})
      .pipe(
        finalize(() => this.setState(state))
      );
  }

  public getFriendsFromServer$(): Observable<User[]>  {
    this.setState({isLoading: true});
    return this.http.get<User[]>(friendsUrl)
      .pipe(
        finalize(() => this.setState({isLoading: false}))
      );
  }

  public removeFriend$(friendId: string): Observable<Object> {
    return this.http.delete(friendsUrl, {body: {friendId}})
      .pipe(
        finalize(() => this.deleteEntity(friendId))
      );
  }
}
