import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './pages/friend-list/friend-list.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { SearchFriendsComponent } from './pages/search-friends/search-friends.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FriendListComponent,
    SearchFriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class FriendsModule { }
