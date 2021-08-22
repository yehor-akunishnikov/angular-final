import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends/friends.service';
import { Friend } from 'src/app/features/store/models/Friend';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.scss']
})
export class FriendsSearchComponent implements OnInit {
  public friends: Friend[] = [];
  public inputState: string = '';
  constructor(
    private readonly friendsService: FriendsService,
  ) { }

  ngOnInit(): void {
    const response = this.friendsService.getFriends$('/users');

    response.subscribe(data => this.friends = data);
  }

  public filterFriends(inputData: string) {
    this.inputState = inputData;
  }

  public addFriend(friend: Friend) {
    this.friendsService.addFriend$(friend._id).subscribe();

    const {friends} = this;
    const newFriends = friends.filter(f => f._id !== friend._id);

    this.friends = [...newFriends];
  }
}
