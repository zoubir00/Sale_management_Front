import type { EntityDto } from '@abp/ng.core';

export interface ClientDto extends EntityDto<string> {
  fName?: string;
  lName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CreateClientDto {
  fName?: string;
  lName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateClientDto {
  fName?: string;
  lName?: string;
  email?: string;
  phoneNumber?: string;
}
