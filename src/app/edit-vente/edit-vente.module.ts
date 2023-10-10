import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { EditVenteRoutingModule } from './edit-vente-routing.module';
import { EditVenteComponent } from './edit-vente.component';


@NgModule({
  declarations: [
    EditVenteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditVenteRoutingModule
  ]
})
export class EditVenteModule { }
