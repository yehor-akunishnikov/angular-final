import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendListComponent } from './pages/friend-list/friend-list.component';
import { SearchFriendsComponent } from './pages/search-friends/search-friends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'friend-list',
    pathMatch: 'full'
  },
  {
    path: 'friend-list',
    component: FriendListComponent,
  },
  {
    path: 'search-friends',
    component: SearchFriendsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
