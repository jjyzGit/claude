import {PayinType, PayoutType, TimeLength} from '@sollapay/enums';
import {parseMoney} from '@sollapay/utils';
import {z} from 'zod';

export const TrustScopeFormSchema = z
  .object({
    timeLength: z
      .union([z.nativeEnum(TimeLength), z.literal('')])
      .refine(v => v !== '', {message: 'common:required'}),
    volume: z
      .string()
      .min(1, 'common:required')
      .refine(
        v => {
          try {
            return parseMoney(v).isPositive();
          } catch {
            return false;
          }
        },
        {message: 'common:invalidNumber'}
      ),
    payinTypes: z.array(z.nativeEnum(PayinType)).min(1, 'common:required'),
    payoutTypes: z.array(z.nativeEnum(PayoutType)).min(1, 'common:required'),
    payinOtherText: z.string(),
    payoutOtherText: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.payinTypes.includes(PayinType.OTHER) && !data.payinOtherText.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['payinOtherText'],
        message: 'common:required'
      });
    }
    if (data.payoutTypes.includes(PayoutType.OTHER) && !data.payoutOtherText.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['payoutOtherText'],
        message: 'common:required'
      });
    }
  });
