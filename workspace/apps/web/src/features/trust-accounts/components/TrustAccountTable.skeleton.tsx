import {Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

const GRID_COLS = 'grid-cols-[180px_1fr_1fr_1fr_1fr_1fr_70px_50px]';

export function TrustAccountTableSkeleton() {
  const {t} = useTranslation('trustAccounts');

  const headers = [
    t('columns.trustName'),
    t('columns.balance'),
    t('columns.type'),
    t('columns.developer'),
    t('status'),
    t('columns.date')
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
      {/* Header */}
      <div
        className={`grid ${GRID_COLS} gap-4 border-b border-border-subtle bg-background-surface px-4 py-3`}
      >
        {headers.map(label => (
          <Typography key={label} size="xs" color="tertiary">
            {label}
          </Typography>
        ))}
        <div />
        <div />
      </div>
      {/* Rows */}
      {Array.from({length: 6}).map((_, i) => (
        <div
          key={i}
          className={`grid ${GRID_COLS} items-center gap-4 border-b border-border-subtle px-4 py-3 last:border-b-0`}
        >
          {/* Name + avatar */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
          {/* Balance */}
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="mx-auto h-7 w-7 rounded-md" />
        </div>
      ))}
    </div>
  );
}
