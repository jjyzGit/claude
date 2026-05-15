import {Skeleton} from '@sollapay/ui/components';

import type {FC} from 'react';

export const LoginFormSkeleton: FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://sollapay-assets.s3.il-central-1.amazonaws.com/background-pattern-decorative.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white rounded-2xl shadow-md w-105 px-10 py-12 flex flex-col items-center gap-6">
        <Skeleton className="size-16 rounded-full" />
        <div className="flex flex-col items-center gap-2 w-full">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
};
