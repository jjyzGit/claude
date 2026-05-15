import {Skeleton} from '@sollapay/ui/components';

import {ActivityKpiCardsSkeleton} from './ActivityKpiCards.skeleton';

function ActivityFeedRowSkeleton() {
  return (
    <div className="flex h-18 w-full items-center">
      {/* RowSpecificInfo — 40% */}
      <div className="flex w-2/5 items-center gap-3 px-6">
        <Skeleton className="size-8 shrink-0 rounded-md" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* DateAndTime — 20% */}
      <div className="flex w-1/5 px-6">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* RowSpecificDataOrAction — 40% */}
      <div className="flex w-2/5 items-center justify-end px-6">
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}

export function ActivityTabContentSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <ActivityKpiCardsSkeleton />
      <div className="overflow-hidden rounded-xl border border-border bg-background-surface shadow-xs">
        <div className="border-b border-border-subtle bg-background-secondary px-6 py-4">
          <Skeleton className="h-5 w-36" />
        </div>
        <div>
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="border-b border-border-subtle last:border-0">
              <ActivityFeedRowSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
