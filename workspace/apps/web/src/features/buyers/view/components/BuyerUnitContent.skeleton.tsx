import {Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

export function BuyerUnitContentSkeleton() {
  const {t} = useTranslation('trustAccounts');

  return (
    <div className="flex flex-col gap-6">
      {/* Unit heading */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-7 w-32" />
      </div>

      {/* Metrics card */}
      <div className="grid grid-cols-4 gap-6 rounded-xl border border-border-subtle p-6 shadow-xs">
        {[
          t('view.buyers.detail.metrics.purchasePrice'),
          t('view.buyers.detail.metrics.maxCollection'),
          t('view.buyers.detail.metrics.paymentRequestsSent'),
          t('view.buyers.detail.metrics.completedPayments')
        ].map(label => (
          <div key={label} className="flex flex-col gap-2">
            <Typography size="xs" color="tertiary">
              {label}
            </Typography>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="mt-1 h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* 5-col grid: payments (3/5) + documents (2/5) */}
      <div className="grid grid-cols-5 items-start gap-8">
        {/* Payment history */}
        <div className="col-span-3 flex flex-col gap-4">
          <Typography size="md">{t('view.buyers.detail.paymentHistory')}</Typography>
          <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
            {Array.from({length: 3}).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border-subtle px-4 py-3 last:border-b-0"
              >
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography size="md">{t('view.buyers.detail.documents')}</Typography>
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
          <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
            {Array.from({length: 2}).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border-subtle px-4 py-4 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-8 shrink-0 rounded" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="size-7 rounded" />
                  <Skeleton className="size-7 rounded" />
                  <Skeleton className="size-7 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
