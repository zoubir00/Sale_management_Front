import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CreateVenteRoutingModule } from './create-vente-routing.module';
import { CreateVenteComponent } from './create-vente.component';


@NgModule({
  declarations: [
    CreateVenteComponent
  ],
  imports: [
    SharedModule,
    CreateVenteRoutingModule
  ]
})
export class CreateVenteModule { }
