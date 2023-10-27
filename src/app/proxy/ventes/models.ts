import type { AuditedEntityDto, EntityDto } from '@abp/ng.core';
import type { VenteLinesDto } from '../vente-lines/models';

export interface GetVenteDto extends EntityDto<string> {
  dateVente?: string;
  clientId?: string;
  clientName?: string;
  qtyTotal: number;
  totalAmount: number;
}

export interface VenteDto extends AuditedEntityDto<string> {
  dateVente?: string;
  clientId?: string;
  clientName?: string;
  clientPhoneNumber?: string;
  qtyTotal: number;
  totalAmount: number;
  venteLines: VenteLinesDto[];
}
