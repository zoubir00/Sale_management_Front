import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ClientDto } from '../clients/models';
import type { ActionResult, IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiName = 'Default';
  

  createClientByClient = (client: ClientDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Clients',
      body: client,
    },
    { apiName: this.apiName,...config });
  

  deleteClientById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Clients/delete/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllClients = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: '/api/Clients',
    },
    { apiName: this.apiName,...config });
  

  getAllClientsById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: `/api/Clients/Client/${id}`,
    },
    { apiName: this.apiName,...config });
  

  updateClientByIdAndClient = (id: number, client: ClientDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Clients/edit/${id}`,
      body: client,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
