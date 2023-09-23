import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ArticleDto } from '../articles/models';
import type { ActionResult, IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiName = 'Default';
  

  createArticleByArticle = (article: ArticleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Articles',
      body: article,
    },
    { apiName: this.apiName,...config });
  

  deleteClientById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Articles/delete/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllArticle = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: '/api/Articles',
    },
    { apiName: this.apiName,...config });
  

  getAllArticleById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: `/api/Articles/Client/${id}`,
    },
    { apiName: this.apiName,...config });
  

  updateArticleByIdAndArticle = (id: number, article: ArticleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Articles/edit/${id}`,
      body: article,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
