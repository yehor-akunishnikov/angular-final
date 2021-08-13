import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';  

const MATERIAL_COMPONENTS = 
[
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
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
