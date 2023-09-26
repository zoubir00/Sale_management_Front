import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VenteRoutingModule } from './vente-routing.module';
import { VenteComponent } from './vente.component';


@NgModule({
  declarations: [
    VenteComponent
  ],
  imports: [
    
    VenteRoutingModule,SharedModule
  ]
})
export class VenteModule { }
