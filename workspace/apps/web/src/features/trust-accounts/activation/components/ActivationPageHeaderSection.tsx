import {Skeleton, Tooltip, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {TrustAccountBadge, TrustAccountBreadcrumbs} from '@/features/trust-accounts/components';
import {TRUST_PURPOSE_CONFIG} from '@/features/trust-accounts/config';

import type {TrustAccountSkeletonDraftDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface ActivationPageHeaderSectionProps {
  trustAccount: TrustAccountSkeletonDraftDTO | undefined;
}

export const ActivationPageHeaderSection: FC<ActivationPageHeaderSectionProps> = ({
  trustAccount
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <section
      className="flex flex-col items-center pt-12"
      data-slot="trust-account-activation-header"
    >
      <div
        className="flex w-full max-w-2xl flex-col items-start gap-3"
        data-slot="activation-page-header-section"
      >
        {/* Breadcrumbs with steps */}
        <TrustAccountBreadcrumbs
          title={t('activation.title')}
          name={trustAccount?.name}
          trustAccountId={trustAccount?.id}
        />

        {/* Main title and meta info */}
        <div className="flex flex-col gap-2 w-full">
          {/* Title */}
          <div className="flex">
            {trustAccount ? (
              <Tooltip
                content={
                  trustAccount.refId
                    ? t('activation.refIdTooltip', {refId: trustAccount.refId})
                    : undefined
                }
              >
                <Typography
                  as="h1"
                  size="display-sm"
                  weight="regular"
                  color="secondary"
                  className="max-w-2xl"
                >
                  {trustAccount.name}
                </Typography>
              </Tooltip>
            ) : (
              <Skeleton className="h-9 w-56" />
            )}
          </div>

          {/* Status and account type row */}
          <div className="flex justify-between w-full">
            {trustAccount?.trustPurpose ? (
              <Typography as="p" size="md" weight="regular" color="tertiary">
                {t('activation.accountType')}:{' '}
                {t(TRUST_PURPOSE_CONFIG[trustAccount.trustPurpose].labelKey)}
              </Typography>
            ) : (
              <Skeleton className="h-5 w-36" />
            )}

            {trustAccount?.trustStatus ? (
              <TrustAccountBadge status={trustAccount.trustStatus} />
            ) : (
              <Skeleton className="h-5 w-24 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
