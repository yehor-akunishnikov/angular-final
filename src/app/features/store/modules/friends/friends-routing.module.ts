import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { FriendsSearchComponent } from './pages/friends-search/friends-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'friends-list',
    pathMatch: 'full',
  },
  {
    path: 'friends-list',
    component: FriendsListComponent,
  },
  {
    path: 'friends-search',
    component: FriendsSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
