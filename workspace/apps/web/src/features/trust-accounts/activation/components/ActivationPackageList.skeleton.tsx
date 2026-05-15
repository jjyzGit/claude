import {Skeleton} from '@sollapay/ui/components';

export function ActivationPackageListSkeleton() {
  return (
    <div className="flex flex-col gap-4 pt-12 pb-6">
      {Array.from({length: 4}).map((_, i) => (
        <div key={i} className="flex items-start gap-4 px-8 py-3.5">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  );
}
