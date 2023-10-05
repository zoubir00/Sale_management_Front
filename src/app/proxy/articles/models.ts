import type { EntityDto } from '@abp/ng.core';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';

export interface ArticleDto extends EntityDto<number> {
  libelle?: string;
  description?: string;
  image?: IFormFile;
  price?: number;
  quantityinStock?: number;
}
