import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsRoutingModule } from './friends-routing.module';

import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { FriendsSearchComponent } from './pages/friends-search/friends-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvitesListComponent } from '../../components/invites-list/invites-list.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    FriendsListComponent,
    FriendsSearchComponent,
    InvitesListComponent,
    ListItemComponent,
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,
  ]
})
export class FriendsModule { }
