import type { EntityDto } from '@abp/ng.core';

export interface VenteLinesDto extends EntityDto<number> {
  venteCode?: string;
  articleId: number;
  qtySold: number;
  totalPrice: number;
}
