import {Skeleton} from '@sollapay/ui/components';

export function ActivityKpiCardsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({length: 4}).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-background-surface p-5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col items-start gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="size-10 shrink-0 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
