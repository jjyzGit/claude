import {AmountDisplay} from '@sollapay/ui';

interface ActivityAmountBadgeProps {
  amountNis: string;
  variant: 'credit' | 'debit';
}

export function ActivityAmountBadge({amountNis, variant}: ActivityAmountBadgeProps) {
  return <AmountDisplay amountNis={amountNis} variant={variant} />;
}
