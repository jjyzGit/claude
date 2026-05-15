import {cn} from '@sollapay/ui';

import {PageErrorState} from '@/components';

import type {ComponentProps} from 'react';

interface PageLayoutProps extends ComponentProps<'main'> {
  error?: boolean;
  refetch?: () => void;
}

export function PageLayout({className, error, refetch, children, ...props}: PageLayoutProps) {
  return (
    <main className={cn('flex flex-col flex-1 min-h-0', className)} {...props}>
      {error ? <PageErrorState refetch={refetch} /> : children}
    </main>
  );
}

export function PageContent({className, ...props}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex-1 min-h-0 overflow-auto pt-8 pb-8 px-24 2xl:px-40', className)}
      {...props}
    />
  );
}
