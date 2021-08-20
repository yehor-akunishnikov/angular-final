import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { MainContainerComponent } from './components/main-container/main-container.component';

const SHARED_COMPONENTS = [
  SimpleModalComponent,
  FormContainerComponent,
  MainContainerComponent,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ...SHARED_COMPONENTS,
  ],
})
export class SharedModule { }
