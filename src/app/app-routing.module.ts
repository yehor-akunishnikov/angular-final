import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

import { AuthGuard } from './core/guards/auth.guard';

import { FormContainerComponent } from './shared/components/form-container/form-container.component';
import { MainContainerComponent } from './shared/components/main-container/main-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: FormContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path:'login',
        loadChildren: () => import('./features/auth/modules/login/login.module').then(m => m.LoginModule),
      },
      {
        path:'register',
        loadChildren: () => import('./features/auth/modules/register/register.module').then(m => m.RegisterModule),
      },
    ],
  },
  {
    path: 'store',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'games',
      },
      {
        path:'friends',
        loadChildren: () => import('./features/store/modules/friends/friends.module').then(m => m.FriendsModule),
      },
      {
        path:'games',
        loadChildren: () => import('./features/store/modules/games/games.module').then(m => m.GamesModule),
      },
      {
        path:'library',
        loadChildren: () => import('./features/store/modules/library/library.module').then(m => m.LibraryModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/store/modules/profile/profile.module').then(m => m.ProfileModule),
      },
    ],
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
