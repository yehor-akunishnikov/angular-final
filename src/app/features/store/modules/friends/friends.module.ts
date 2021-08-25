import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FriendsRoutingModule } from './friends-routing.module';

import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { FriendsSearchComponent } from './pages/friends-search/friends-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvitesListComponent } from '../../components/invites-list/invites-list.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';



@NgModule({
  declarations: [
    FriendsListComponent,
    FriendsSearchComponent,
    InvitesListComponent,
    ListItemComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FriendsRoutingModule,
    SharedModule,
  ]
})
export class FriendsModule { }
