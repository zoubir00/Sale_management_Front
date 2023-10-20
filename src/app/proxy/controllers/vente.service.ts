import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';
import type { VenteLinesDto } from '../vente-lines/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  addVenteByDateVenteAndClientIdAndVenteLines = (dateVente: string, clientId: number, venteLines: VenteLinesDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/vente',
      params: { dateVente, clientId },
      body: venteLines,
    },
    { apiName: this.apiName,...config });
  

  addVenteLineByVenteCodeAndNewVenteLineDto = (venteCode: string, newVenteLineDto: VenteLinesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Vente/newVenteLine',
      params: { venteCode },
      body: newVenteLineDto,
    },
    { apiName: this.apiName,...config });
  

  deleteByCodeVente = (codeVente: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Vente/${codeVente}`,
    },
    { apiName: this.apiName,...config });
  

  deleteByCodeVenteAndVenteLineId = (codeVente: string, venteLineId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Vente/ventelines/${venteLineId}`,
      params: { codeVente },
    },
    { apiName: this.apiName,...config });
  

  getVentes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Vente/ventes',
    },
    { apiName: this.apiName,...config });
  

  updateVenteByVenteCodeAndNewDateVenteAndNewcClientIdAndVenteLines = (venteCode: string, newDateVente: string, newcClientId: number, venteLines: VenteLinesDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: '/api/Vente',
      params: { venteCode, newDateVente, newcClientId },
      body: venteLines,
    },
    { apiName: this.apiName,...config });
  

  venteDetailsByCodeVente = (codeVente: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Vente/${codeVente}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
