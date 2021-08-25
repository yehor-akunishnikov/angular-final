import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { FormContainerComponent } from './components/form-container/form-container.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter/search-filter.pipe';
import { FullscreenSpinnerComponent } from './components/fullscreen-spinner/fullscreen-spinner.component';

const SHARED_COMPONENTS = [
  FormContainerComponent,
  MainContainerComponent,
  PageHeaderComponent,
  SearchFormComponent,
  FullscreenSpinnerComponent,
];
const SHARED_PIPES = [
  SearchFilterPipe,
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
