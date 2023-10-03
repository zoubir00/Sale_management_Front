import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VenteRoutingModule } from './vente-routing.module';
import { VenteComponent } from './vente.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    VenteComponent
  ],
  imports: [
    
    VenteRoutingModule,SharedModule,MatPaginatorModule,MatProgressSpinnerModule
  ]
})
export class VenteModule { }
