import type { EntityDto } from '@abp/ng.core';

export interface ClientDto extends EntityDto<number> {
  fName?: string;
  lName?: string;
  email?: string;
  phoneNumber?: string;
}
