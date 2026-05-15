import {Breadcrumbs, cn, Typography} from '@sollapay/ui';

import type {BreadcrumbsProps} from '@sollapay/ui';
import type {ComponentProps, ReactNode} from 'react';

interface PageHeaderProps extends ComponentProps<'div'> {
  title: string;
  titleNode?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  breadcrumbsMetadata?: BreadcrumbsProps;
  tabs?: ReactNode;
}

export function PageHeader({
  title,
  titleNode,
  description,
  badge,
  actions,
  breadcrumbs,
  breadcrumbsMetadata,
  tabs,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'relative rounded-tr-4xl px-24 2xl:px-40 pt-5 border-b',
        tabs ? 'pb-px border-border-subtle' : 'pb-5 border-border',
        className
      )}
      {...props}
    >
      {(breadcrumbs ?? breadcrumbsMetadata) && (
        <div className="mb-2">{breadcrumbs ?? <Breadcrumbs {...breadcrumbsMetadata!} />}</div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <h1 className="font-semibold text-fg text-display-sm leading-display-sm font-display">
            {titleNode ?? title}
          </h1>
          {badge && (
            <span
              className={cn('text-xs text-fg-tertiary', typeof badge !== 'string' && 'self-center')}
            >
              {badge}
            </span>
          )}
        </div>
        {description &&
          (typeof description === 'string' ? (
            <Typography size="sm" color="tertiary">
              {description}
            </Typography>
          ) : (
            <div>{description}</div>
          ))}
      </div>
      {actions && (
        <div className="absolute end-24 2xl:end-40 top-5 flex items-start">{actions}</div>
      )}
      {tabs && <div className="mt-6">{tabs}</div>}
    </div>
  );
}

export type {PageHeaderProps};
