import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { User } from 'src/app/features/store/models/User';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  public friends$: Observable<User[]> = new Observable();
  public loading$: Observable<boolean> = new Observable();

  constructor(
    private readonly friendsService: FriendsService,
  ) { }

  public ngOnInit(): void {
    this.friends$ = this.friendsService.getFriends$();
    this.loading$ = this.friendsService.isLoading$();
  }

  public acceptInvite(friend: User) {
    this.friendsService.acceptInvite$(friend)
      .subscribe();
  }

  public removeFriend(friend: User) {
    this.friendsService.removeFriend$(friend._id)
      .subscribe();
  }
}
