import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenteDetailComponent } from './vente-detail.component';

const routes: Routes = [{ path: '', component: VenteDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenteDetailRoutingModule { }
