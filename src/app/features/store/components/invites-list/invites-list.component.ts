import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { InvitesService } from 'src/app/core/services/invites/invites.service';

import { User } from '../../models/User';
import { Invite } from '../../models/Invite';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit {
  public invites$: Observable<Invite[]> = new Observable<Invite[]>();
  public loading$: Observable<boolean> = new Observable();
  @Output() onInviteAccept: EventEmitter<User> = new EventEmitter;

  constructor(
    private readonly inviteService: InvitesService,
  ) { }

  public ngOnInit(): void {
    this.invites$ = this.inviteService.getInvites$();
    this.loading$ = this.inviteService.isLoading$();
  }

  public acceptInvite(invite: Invite) {
    this.inviteService.removeInvite(invite._id);

    this.onInviteAccept.emit({
      _id: invite.requester,
      username: invite.requesterName,
      status: invite.status,
      type: '',
      inviteId: invite._id,
    });
  }

}
