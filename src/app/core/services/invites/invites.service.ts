import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { Invite } from 'src/app/features/store/models/Invite';
import { Store } from '../../stores/defaultStore';
import { invitesUrl } from '../../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class InvitesService extends Store<Invite> {
  constructor(
    private readonly http: HttpClient,
  ) {
    super();
  }

  public getInvites$(): Observable<Invite[]> {
    this.getInvitesFromServer$().subscribe(entities => {
      this.setState({entities: this.transformArray(entities, '_id')});
    });

    return this.getState$()
      .pipe(
        map(({entities}) => Object.values(entities)),
      );
  }

  public removeInvite(inviteId: string): void {
    this.deleteEntity(inviteId);
  }

  private getInvitesFromServer$(): Observable<Invite[]> {
    this.setState({isLoading: true});
    return this.http.get<Invite[]>(invitesUrl)
      .pipe(
        finalize(() => this.setState({isLoading: false}))
      );
  }
}
