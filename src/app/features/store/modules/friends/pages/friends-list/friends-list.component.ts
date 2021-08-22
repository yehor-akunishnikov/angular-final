import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { Friend } from 'src/app/features/store/models/Friend';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  public friends: Friend[] = [];
  constructor(
    private readonly friendsService: FriendsService,
  ) { }

  ngOnInit(): void {
    const response = this.friendsService.getFriends$('/users/me/friends');

    response.subscribe(data => this.friends = data);
  }

  public filterFriends(data: string) {
  }

  public removeFriend(friend: Friend) {
    this.friendsService.removeFriend$(friend._id).subscribe();

    const {friends} = this;
    const newFriends = friends.filter(f => f._id !== friend._id);

    this.friends = [...newFriends];
  }
}
