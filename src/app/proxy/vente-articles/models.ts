import type { CreateUpdateVenteDto } from '../ventes/models';
import type { ArticleDto } from '../articles/models';

export interface VenteArticlesDto {
  amount: number;
  price: number;
  venteId: number;
  vente: CreateUpdateVenteDto;
  articleId: number;
  article: ArticleDto;
}
