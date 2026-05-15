import {ContentSection, Skeleton, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

export function BeneficiariesTabContentSkeleton() {
  const {t} = useTranslation('trustAccounts');

  const headers = [
    t('view.beneficiaries.columns.name'),
    t('view.beneficiaries.columns.role'),
    t('view.beneficiaries.columns.nationalId'),
    t('view.beneficiaries.columns.address'),
    t('view.beneficiaries.columns.share')
  ];

  return (
    <ContentSection
      title={t('view.beneficiaries.title')}
      subtitle={t('view.beneficiaries.subtitle')}
      action={<Skeleton className="h-9 w-36 rounded-md" />}
    >
      <div className="overflow-hidden rounded-xl border border-border-subtle shadow-xs">
        <div className="grid grid-cols-5 gap-4 border-b border-border-subtle bg-background-surface px-4 py-3">
          {headers.map(label => (
            <Typography key={label} size="xs" color="tertiary">
              {label}
            </Typography>
          ))}
        </div>
        {Array.from({length: 4}).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center gap-4 border-b border-border-subtle px-4 py-3 last:border-b-0"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </ContentSection>
  );
}
