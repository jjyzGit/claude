import {DeveloperType, RelationshipType} from '@sollapay/enums';
import {z} from 'zod';

export const DeveloperDetailsFormSchema = z.object({
  developerType: z
    .union([z.nativeEnum(DeveloperType), z.literal('')])
    .refine(v => v !== '', {message: 'common:required'}),
  relationshipType: z
    .union([z.nativeEnum(RelationshipType), z.literal('')])
    .refine(v => v !== '', {message: 'common:required'}),
  metFaceToFace: z.enum(['yes', 'no', '']).refine(v => v !== '', {message: 'common:required'}),
  fullName: z.string().min(1, 'common:required'),
  idNumber: z.string().min(1, 'common:required'),
  establishedDate: z.string().min(1, 'common:required'),
  address: z.string().min(1, 'common:required')
});
