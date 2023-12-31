import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'articles', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
  { path: 'ventes', loadChildren: () => import('./vente/vente.module').then(m => m.VenteModule) },
  { path: 'articleDetail/:id', loadChildren: () => import('./article-details/article-details.module').then(m => m.ArticleDetailsModule) },
  { path: 'search/:lname', loadChildren: () => import('./search-vente/search-vente.module').then(m => m.SearchVenteModule) },
  { path: 'createventes', loadChildren: () => import('./create-vente/create-vente.module').then(m => m.CreateVenteModule) },
  { path: 'saledetails/:codeVente', loadChildren: () => import('./vente-detail/vente-detail.module').then(m => m.VenteDetailModule) },
  { path: 'editVente/:codeVente', loadChildren: () => import('./edit-vente/edit-vente.module').then(m => m.EditVenteModule) },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
