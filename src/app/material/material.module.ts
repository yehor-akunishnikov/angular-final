import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';  
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
