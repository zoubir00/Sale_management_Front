import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { CreateUpdateVenteDto } from '../ventes/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  createVenteByClientIdAndVente = (clientId: number, vente: CreateUpdateVenteDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/vente',
      params: { clientId },
      body: vente,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
