import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { FormContainerComponent } from './components/form-container/form-container.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersFilterPipe } from './pipes/users-filter/users-filter.pipe';
import { FullscreenSpinnerComponent } from './components/fullscreen-spinner/fullscreen-spinner.component';
import { GamesFilterPipe } from './pipes/games-filter/games-filter.pipe';
import { GameComponent } from './components/game/game.component';

const SHARED_COMPONENTS = [
  FormContainerComponent,
  MainContainerComponent,
  PageHeaderComponent,
  FullscreenSpinnerComponent,
  GameComponent,
];
const SHARED_PIPES = [
  UsersFilterPipe,
  GamesFilterPipe,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
  ],
})
export class SharedModule { }
