import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditVenteComponent } from './edit-vente.component';

const routes: Routes = [{ path: '', component: EditVenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditVenteRoutingModule { }
