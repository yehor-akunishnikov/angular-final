import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/features/store/models/User';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.scss']
})
export class FriendsSearchComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public users$: Observable<User[]> = new Observable();
  public loading$: Observable<boolean> = new Observable();
  public searchInputText = '';

  constructor(
    private readonly usersService: UsersService,
  ) { }

  public ngOnInit(): void {
    this.users$ = this.usersService.getUsers$();
    this.loading$ = this.usersService.isLoading$();
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public sendInvite(user: User) {
    this.usersService.sendInvite(user._id);
  }

  public cancelInvite(user: User) {
    const { _id, inviteId } = user;
    
    this.usersService.cancelInvite$(inviteId, _id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }

  public acceptInvite(user: User) {
    const { _id, inviteId } = user;

    this.usersService.acceptInvite$(inviteId, _id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }

  public updateFilter(text: string) {
    this.searchInputText = text;
  }
}
