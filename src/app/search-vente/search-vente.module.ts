import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchVenteRoutingModule } from './search-vente-routing.module';
import { SearchVenteComponent } from './search-vente.component';


@NgModule({
  declarations: [
    SearchVenteComponent
  ],
  imports: [
    SharedModule,
    SearchVenteRoutingModule
  ]
})
export class SearchVenteModule { }
