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
      url: '/api/Articles/CreateArticle',
      body: article,
    },
    { apiName: this.apiName,...config });
  

  deleteArticleById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Articles/deleteArticle/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllArticle = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: '/api/Articles/GetArticles',
    },
    { apiName: this.apiName,...config });
  

  getArticleByIdById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: `/api/Articles/article/${id}`,
    },
    { apiName: this.apiName,...config });
  

  searchBySlibelle = (Slibelle: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Articles/articleLibelli',
      params: { slibelle: Slibelle },
    },
    { apiName: this.apiName,...config });
  

  updateArticleByIdAndArticle = (id: number, article: ArticleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Articles/editArticle/${id}`,
      body: article,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
