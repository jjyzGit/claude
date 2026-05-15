import {PartyRole} from '@sollapay/enums';

import type {BeneficiaryDTO} from '@sollapay/types';

export const filterBuyers = (beneficiaries: BeneficiaryDTO[]): BeneficiaryDTO[] =>
  beneficiaries.filter(b => b.role === PartyRole.BUYER);
