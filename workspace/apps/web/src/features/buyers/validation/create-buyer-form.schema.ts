import {UnitAttachmentType} from '@sollapay/enums';
import {z} from 'zod';

const UnitAttachmentSchema = z.object({
  type: z.nativeEnum(UnitAttachmentType),
  description: z.string().optional()
});

const UnitSchema = z.object({
  buildingNumber: z.string().min(1, 'common:required'),
  unitNumber: z.string().min(1, 'common:required'),
  attachments: z.array(UnitAttachmentSchema).default([])
});

export const BuyerEntrySchema = z.object({
  fullName: z.string().min(1, 'common:required'),
  nationalId: z.string().min(1, 'common:required'),
  dateOfBirth: z.string().min(1, 'common:required'),
  phone: z.string().min(1, 'common:required'),
  email: z.string().min(1, 'common:required').email('common:invalidEmail'),
  address: z.string().min(1, 'common:required')
});

export const CreateBuyerFormSchema = z.object({
  buyers: z.array(BuyerEntrySchema).min(1),
  unit: UnitSchema,
  purchasePriceNis: z.string().min(1, 'common:required')
});

export type CreateBuyerFormValues = z.infer<typeof CreateBuyerFormSchema>;

export const EMPTY_BUYER_ENTRY: z.infer<typeof BuyerEntrySchema> = {
  fullName: '',
  nationalId: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: ''
};

export const EMPTY_CREATE_BUYER_FORM_VALUES: CreateBuyerFormValues = {
  buyers: [EMPTY_BUYER_ENTRY],
  unit: {buildingNumber: '', unitNumber: '', attachments: []},
  purchasePriceNis: ''
};
