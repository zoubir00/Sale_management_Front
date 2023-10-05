import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { VenteLinesDto } from '../vente-lines/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  addVenteByVenteCodeAndDateVenteAndClientIdAndVenteLines = (venteCode: string, dateVente: string, clientId: number, venteLines: VenteLinesDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/vente',
      params: { venteCode, dateVente, clientId },
      body: venteLines,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
