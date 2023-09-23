import type { EntityDto } from '@abp/ng.core';

export interface ArticleDto extends EntityDto<number> {
  libelle?: string;
  description?: string;
  image?: string;
  price: number;
  quantityinStock: number;
}
