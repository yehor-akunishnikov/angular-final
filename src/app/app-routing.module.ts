import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

import { FormContainerComponent } from './shared/components/form-container/form-container.component';
import { MainContainerComponent } from './shared/components/main-container/main-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
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
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'friends',
      },
      {
        path:'friends',
        loadChildren: () => import('./features/store/modules/friends/friends.module').then(m => m.FriendsModule),
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
