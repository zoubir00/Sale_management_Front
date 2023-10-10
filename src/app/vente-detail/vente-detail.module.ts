import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenteDetailRoutingModule } from './vente-detail-routing.module';
import { VenteDetailComponent } from './vente-detail.component';


@NgModule({
  declarations: [
    VenteDetailComponent
  ],
  imports: [
    CommonModule,
    VenteDetailRoutingModule
  ]
})
export class VenteDetailModule { }
