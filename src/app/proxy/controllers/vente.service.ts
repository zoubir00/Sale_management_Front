import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  createVenteByClientIdAndArticleIdAndQuantity = (clientId: number, articleId: number, quantity: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/vente',
      params: { clientId, articleId, quantity },
    },
    { apiName: this.apiName,...config });
  

  getClientVentesByClientfNameAndClientlName = (ClientfName: string, ClientlName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Vente',
      params: { clientfName: ClientfName, clientlName: ClientlName },
    },
    { apiName: this.apiName,...config });
  

  getVentes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Vente/ventes',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
