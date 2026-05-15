import {Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

export function BuyerTableSkeleton() {
  const {t} = useTranslation('trustAccounts');

  const headers = [
    t('view.buyers.list.columns.buyerName'),
    t('view.buyers.list.columns.createdAt'),
    t('view.buyers.list.columns.purchasePrice'),
    t('view.buyers.list.columns.amountToPay'),
    t('view.buyers.list.columns.depositPaid'),
    t('view.buyers.list.columns.paymentStatus')
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
      {/* Header row */}
      <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr_1fr_160px_68px] gap-4 border-b border-border-subtle bg-background-surface px-4 py-3">
        {headers.map(label => (
          <Typography key={label} size="xs" color="tertiary">
            {label}
          </Typography>
        ))}
        <div />
        <div />
      </div>
      {/* Data rows */}
      {Array.from({length: 8}).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[200px_1fr_1fr_1fr_1fr_1fr_160px_68px] items-center gap-4 border-b border-border-subtle px-4 py-3 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="mx-auto h-7 w-7 rounded-md" />
        </div>
      ))}
    </div>
  );
}
