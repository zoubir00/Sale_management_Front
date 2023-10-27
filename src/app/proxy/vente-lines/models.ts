import type { EntityDto } from '@abp/ng.core';

export interface VenteLinesDto extends EntityDto<string> {
  venteCode?: string;
  articleId?: string;
  articlelebelle?: string;
  qtySold: number;
  salePrice: number;
  totalPrice: number;
}
