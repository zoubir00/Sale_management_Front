import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchVenteComponent } from './search-vente.component';

const routes: Routes = [{ path: '', component: SearchVenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchVenteRoutingModule { }
