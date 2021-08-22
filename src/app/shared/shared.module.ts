import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const SHARED_COMPONENTS = [
  SimpleModalComponent,
  FormContainerComponent,
  MainContainerComponent,
  PageHeaderComponent,
  SearchFormComponent,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...SHARED_COMPONENTS,
  ],
})
export class SharedModule { }
