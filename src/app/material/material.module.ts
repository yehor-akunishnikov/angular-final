import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';  
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard'; 
import { MatChipsModule } from '@angular/material/chips';

const MATERIAL_COMPONENTS = 
[
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatDividerModule,
  MatCheckboxModule,
  ClipboardModule,
  MatChipsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MATERIAL_COMPONENTS,
  ],
  exports: [
    ...MATERIAL_COMPONENTS,
  ]
})
export class MaterialModule { }
