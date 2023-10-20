import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ArticleDto } from '../articles/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { ActionResult, IActionResult } from '../microsoft/asp-net-core/mvc/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiName = 'Default';
  Apiurl= 'https://localhost:44354/api/Articles';
  createArticle(article: ArticleDto, img: File): Observable<any> {
     
    const formData: FormData = new FormData();
    formData.append('img', img, img.name);
    formData.append('Libelle', article.libelle);
    formData.append('Description', article.description);
    formData.append('Price', article.price.toString());
    formData.append('QuantityinStock', article.quantityinStock.toString());

    // Send POST request to the API endpoint
    return this.http.post<any>(`${this.Apiurl}/CreateArticle`, formData);
  }
  updateArticle(id: number, article: ArticleDto, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('img', img, img.name);
    formData.append('Libelle', article.libelle);
    formData.append('Description', article.description);
    formData.append('Price', article.price.toString());
    formData.append('QuantityinStock', article.quantityinStock.toString());

    // Send PUT request to the API endpoint
    return this.http.put<any>(`${this.Apiurl}/editArticle/${id}`, formData);
  }

  articlesSold = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Articles/mostSold',
    },
  { apiName: this.apiName,...config });
  

  createArticleByArticleAndImg = (article: ArticleDto, img: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Articles/CreateArticle',
      body: img,
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
  

  updateArticleByIdAndArticleAndImg = (id: number, article: ArticleDto, img: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Articles/editArticle/${id}`,
      body: img,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService,private http: HttpClient) {}
}
