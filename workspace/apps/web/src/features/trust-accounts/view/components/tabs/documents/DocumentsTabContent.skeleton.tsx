import {ContentSection, Skeleton} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

function DocumentsTableSkeleton({rows = 3}: {rows?: number}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
      {Array.from({length: rows}).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-border-subtle px-4 py-3 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocumentsTabContentSkeleton() {
  const {t} = useTranslation('trustAccounts');

  return (
    <div className="flex flex-col gap-10">
      <ContentSection
        title={t('view.documents.trustDetails.title')}
        subtitle={t('view.documents.trustDetails.subtitle')}
        action={<Skeleton className="h-9 w-32 rounded-md" />}
      >
        <DocumentsTableSkeleton />
      </ContentSection>
      <ContentSection
        title={t('view.documents.compliance.title')}
        subtitle={t('view.documents.compliance.subtitle')}
        action={<Skeleton className="h-9 w-32 rounded-md" />}
      >
        <DocumentsTableSkeleton rows={2} />
      </ContentSection>
    </div>
  );
}
