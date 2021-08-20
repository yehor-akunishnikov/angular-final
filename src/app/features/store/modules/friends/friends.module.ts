import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FriendsRoutingModule } from './friends-routing.module';

import { FriendsComponent } from './friends.component';
import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { FriendsSearchComponent } from './pages/friends-search/friends-search.component';



@NgModule({
  declarations: [
    FriendsComponent,
    FriendsListComponent,
    FriendsSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FriendsRoutingModule,
  ]
})
export class FriendsModule { }
