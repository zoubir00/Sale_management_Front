import type { EntityDto } from '@abp/ng.core';

export interface CreateArticleDto {
  libelle?: string;
  description?: string;
  image?: string;
  price: number;
  quantityinStock: number;
}

export interface UpdateArticleDto {
  libelle?: string;
  description?: string;
  image?: string;
  price: number;
  quantityinStock: number;
}

export interface ArticleDto extends EntityDto<string> {
  libelle?: string;
  description?: string;
  image?: string;
  price?: number;
  quantityinStock?: number;
}
