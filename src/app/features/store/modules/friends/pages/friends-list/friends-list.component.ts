import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/features/store/models/User';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public friends$: Observable<User[]> = new Observable();
  public loading$: Observable<boolean> = new Observable();
  @Output() onPageLoading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly friendsService: FriendsService,
  ) { }

  public ngOnInit(): void {
    this.onPageLoading.emit();
    this.friends$ = this.friendsService.getFriends$();
    this.loading$ = this.friendsService.isLoading$();
  }

  public ngOnDestroy() {
    this.onPageLoading.emit();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public acceptInvite(friend: User) {
    this.friendsService.acceptInvite$(friend)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }

  public removeFriend(friend: User) {
    this.friendsService.removeFriend$(friend._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }
}
