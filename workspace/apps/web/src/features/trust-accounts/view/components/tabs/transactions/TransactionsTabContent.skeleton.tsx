import {Skeleton} from '@sollapay/ui';

export function TransactionsTabContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar: search | [group-by + filter] */}
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
      {/* Group 1 skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-11 w-full rounded-none" />
        <Skeleton className="h-[72px] w-full rounded-xl" />
        <Skeleton className="h-[72px] w-full rounded-xl" />
      </div>
      {/* Group 2 skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-11 w-full rounded-none" />
        <Skeleton className="h-[72px] w-full rounded-xl" />
      </div>
    </div>
  );
}
