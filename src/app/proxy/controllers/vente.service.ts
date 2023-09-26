import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { InputVente } from '../ventes/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  addVenteByInput = (input: InputVente, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/vente',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Vente/ConfirmDelete/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getClientVentesByClientfNameAndClientlName = (ClientfName: string, ClientlName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Vente/GetVenteByClient',
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
