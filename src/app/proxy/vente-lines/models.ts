import type { EntityDto } from '@abp/ng.core';

export interface VenteLinesDto extends EntityDto<number> {
  venteCode?: string;
  articleId: number;
  articlelebelle?: string;
  qtySold: number;
  salePrice: number;
  totalPrice: number;
}
