import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FriendsRoutingModule } from './friends-routing.module';

import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { FriendsSearchComponent } from './pages/friends-search/friends-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FriendComponent } from '../../components/friend/friend.component';



@NgModule({
  declarations: [
    FriendsListComponent,
    FriendsSearchComponent,
    FriendComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FriendsRoutingModule,
    SharedModule,
  ]
})
export class FriendsModule { }
