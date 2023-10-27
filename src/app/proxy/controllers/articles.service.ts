import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateArticleDto, UpdateArticleDto } from '../articles/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { ActionResult, IActionResult } from '../microsoft/asp-net-core/mvc/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiName = 'Default';
  Apiurl= 'https://localhost:44354/api/Articles';
  createArticle(article: CreateArticleDto, img: File): Observable<any> {
     
    const formData: FormData = new FormData();
    formData.append('img', img, img.name);
    formData.append('Libelle', article.libelle);
    formData.append('Description', article.description);
    formData.append('Price', article.price.toString());
    formData.append('QuantityinStock', article.quantityinStock.toString());

    // Send POST request to the API endpoint
    return this.http.post<any>(`${this.Apiurl}/CreateArticle`, formData);
  }
  

  deleteArticleById = (id: string, config?: Partial<Rest.Config>) =>
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
  

  getArticleByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ActionResult>({
      method: 'GET',
      url: `/api/Articles/article/${id}`,
    },
    { apiName: this.apiName,...config });
  

    updateArticle(id: string, article: UpdateArticleDto, img: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('img', img, img.name);
      formData.append('Libelle', article.libelle);
      formData.append('Description', article.description);
      formData.append('Price', article.price.toString());
      formData.append('QuantityinStock', article.quantityinStock.toString());
  
      // Send PUT request to the API endpoint
      return this.http.put<any>(`${this.Apiurl}/editArticle/${id}`, formData);
    }

  constructor(private restService: RestService,private http:HttpClient) {}
}
