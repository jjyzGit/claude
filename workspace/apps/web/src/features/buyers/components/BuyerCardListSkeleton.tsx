import {Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

export function BuyerCardListSkeleton() {
  const {t} = useTranslation('trustAccounts');

  const labels = [
    t('view.buyers.list.columns.purchasePrice'),
    t('view.buyers.list.columns.depositPaid'),
    t('view.buyers.list.columns.createdAt'),
    t('view.buyers.list.columns.paymentStatus')
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({length: 6}).map((_, i) => (
        <div
          key={i}
          className="flex w-full flex-col rounded-lg border border-border bg-background-surface shadow-xs transition-shadow"
        >
          {/* Header */}
          <div className="flex items-start justify-between px-5 pt-6 pb-5">
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-col gap-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="grid flex-1 grid-cols-2 gap-x-3 gap-y-4 border-t border-border px-5 pt-4 pb-10">
            {labels.map(label => (
              <div key={label} className="min-w-0">
                <Typography size="xs" color="tertiary">
                  {label}
                </Typography>
                <Skeleton className="mt-1 h-4 w-20" />
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="px-3.5 pb-6">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
