import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { User } from 'src/app/features/store/models/User';
import { invitesUrl, usersUrl } from '../../constants/urls';
import { Store } from '../../stores/defaultStore';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Store<User> {
  constructor(
    private readonly http: HttpClient,
  ) {
    super();
  }

  private updateUser(userId: string, newData: Object) {
    const users = { ...this.state$.getValue().entities };
    const updatedUser = {
      ...users[userId],
      ...newData,
    };
    users[userId] = updatedUser;

    const state = { entities: users };
    this.setState(state);
  }

  public getUsers$(): Observable<User[]> {
    this.getUsersFromServer$()
    .subscribe(entities => {
      this.setState({entities: this.transformArray(entities, '_id')});
    });

    return this.getState$()
      .pipe(
        map(({entities}) => Object.values(entities)),
      );
  }

  public sendInvite(userId: string): void {
    this.http.post<string>(invitesUrl, {userId})
      .subscribe((inviteId) => {
        const newData = {
          status: 1, 
          type: 'recipient', 
          inviteId
        };

        this.updateUser(userId, newData);
      }
    );
  }

  public cancelInvite$(inviteId: string, userId: string): Observable<Object> {
    const newData = {
      status: 0, 
      type: '', 
      inviteId: ''
    };
    
    return this.http.delete(invitesUrl, { body: { inviteId } })
      .pipe(
        finalize(() => this.updateUser(userId, newData))
      );
  }

  public acceptInvite$(inviteId: string, userId: string): Observable<Object> {
    return this.http.put(invitesUrl, {inviteId})
      .pipe(
        finalize(() => this.deleteEntity(userId))
      );
  }

  public getUsersFromServer$(): Observable<User[]>  {
    this.setState({isLoading: true})
    return this.http.get<User[]>(usersUrl)
      .pipe(
        finalize(() => this.setState({isLoading: false}))
      );  
  }
}
