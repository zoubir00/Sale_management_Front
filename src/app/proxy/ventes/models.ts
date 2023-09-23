import type { VenteArticlesDto } from '../vente-articles/models';

export interface CreateUpdateVenteDto {
  dataVente?: string;
  totalAmount: number;
  venteItems: VenteArticlesDto[];
  clientId: number;
}
