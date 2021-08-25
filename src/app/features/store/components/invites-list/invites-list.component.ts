import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InvitesService } from 'src/app/core/services/invites/invites.service';

import { User } from '../../models/User';
import { Invite } from '../../models/Invite';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
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

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public acceptInvite(invite: Invite) {
    this.inviteService.acceptInvite$(invite._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();

    this.onInviteAccept.emit({
      _id: invite.requester,
      username: invite.requesterName,
      status: invite.status,
      type: '',
      inviteId: invite._id,
    });
  }

}
