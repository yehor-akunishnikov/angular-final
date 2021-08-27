import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesRoutingModule } from './games-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GamesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class GamesModule { }
