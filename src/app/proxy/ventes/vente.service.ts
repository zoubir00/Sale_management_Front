import type { GetVenteDto, VenteDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { VenteLinesDto } from '../vente-lines/models';

@Injectable({
  providedIn: 'root',
})
export class VenteService {
  apiName = 'Default';
  

  createVenteByDateVenteAndClientIdAndVenteLines = (dateVente: string, clientId: string, venteLines: VenteLinesDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, VenteDto>({
      method: 'POST',
      url: `/api/app/vente/vente/${clientId}`,
      params: { dateVente },
      body: venteLines,
    },
    { apiName: this.apiName,...config });
  

  deleteVenteByVenteCode = (venteCode: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/vente/vente',
      params: { venteCode },
    },
    { apiName: this.apiName,...config });
  

  deleteVenteLineByCodeVenteAndVenteLineId = (codeVente: string, venteLineId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/vente/vente-line/${venteLineId}`,
      params: { codeVente },
    },
    { apiName: this.apiName,...config });
  

  getAllVentes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetVenteDto>>({
      method: 'GET',
      url: '/api/app/vente/ventes',
    },
    { apiName: this.apiName,...config });
  

  getVenteDetailsByCodeVente = (codeVente: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VenteDto>({
      method: 'GET',
      url: '/api/app/vente/vente-details',
      params: { codeVente },
    },
    { apiName: this.apiName,...config });
  

  updateVente = (venteCode: string, newDateVente: string, newClientId: string, updatedVenteLines: VenteLinesDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, VenteDto>({
      method: 'PUT',
      url: `/api/app/vente/vente/${newClientId}`,
      params: { venteCode, newDateVente },
      body: updatedVenteLines,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
