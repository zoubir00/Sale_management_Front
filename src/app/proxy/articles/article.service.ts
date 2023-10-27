import type { ArticleDto, CreateArticleDto, UpdateArticleDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiName = 'Default';
  

  create = (article: CreateArticleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ArticleDto>({
      method: 'POST',
      url: '/api/app/article',
      body: article,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/article/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ArticleDto>>({
      method: 'GET',
      url: '/api/app/article',
    },
    { apiName: this.apiName,...config });
  

  getById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ArticleDto>({
      method: 'GET',
      url: `/api/app/article/${id}/by-id`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, Newarticle: UpdateArticleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/article/${id}`,
      body: Newarticle,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
