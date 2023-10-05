import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVenteComponent } from './create-vente.component';

const routes: Routes = [{ path: '', component: CreateVenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateVenteRoutingModule { }
