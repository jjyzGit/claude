import {Badge, Typography} from '@sollapay/ui/components';
import {cn} from '@sollapay/ui/lib';
import {useTranslation} from 'react-i18next';

import {ACTIVATION_PACKAGE_CONFIG} from '../config';
import {ActivationPackageAvatar} from './ActivationPackageAvatar';
import {ActivationPackageCta} from './ActivationPackageCta';
import {ActivationPackageStatusBadge} from './ActivationPackageStatusBadge';
import {getAction, getStatusLabelKey, isDimmed} from '../utils';

import type {PackageStatus, PackageType} from '@sollapay/enums';
import type {PackageReadiness} from '@sollapay/types';
import type {FC, KeyboardEvent} from 'react';

interface ActivationPackageRowProps {
  type: PackageType;
  status: PackageStatus;
  canEdit: boolean;
  canSubmit: boolean;
  readiness: PackageReadiness;
  onNavigate: () => void;
  isSubmittedForReview?: boolean;
}

export const ActivationPackageRow: FC<ActivationPackageRowProps> = ({
  type,
  status,
  canEdit,
  canSubmit,
  readiness,
  onNavigate,
  isSubmittedForReview = false
}) => {
  const {t} = useTranslation(['trustAccounts', 'common']);
  const config = ACTIVATION_PACKAGE_CONFIG[type];
  const statusLabelKey = getStatusLabelKey(
    status,
    canEdit,
    canSubmit,
    readiness,
    isSubmittedForReview
  );
  const action = getAction(status, canEdit, readiness, isSubmittedForReview);
  const dimmed = isDimmed(status);
  const isOptionalComingSoon = config.isOptional;
  const isTextMuted = dimmed || isOptionalComingSoon;
  const isInteractive = !isSubmittedForReview && !isOptionalComingSoon;

  const handleAction = () => {
    onNavigate();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') handleAction();
  };

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={cn(
        'flex items-start gap-4 px-8 py-3.5',
        isInteractive && 'cursor-pointer transition-colors hover:bg-background-surface_hover'
      )}
      onClick={isInteractive ? handleAction : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      data-slot="activation-package-row"
    >
      <ActivationPackageAvatar type={type} isDimmed={dimmed || isOptionalComingSoon} />

      <div className="flex min-w-0 flex-1 flex-col gap-1 items-start">
        <div className={`flex items-center justify-end gap-1`}>
          <Typography as="p" size="sm" weight="medium" color={isTextMuted ? 'disabled' : 'default'}>
            {t(config.titleKey)}
          </Typography>

          {isOptionalComingSoon && (
            <Badge variant="gray" size="sm">
              {t('common:comingSoon')}
            </Badge>
          )}
        </div>
        <Typography as="p" size="sm" color={isTextMuted ? 'disabled' : 'tertiary'}>
          {t(config.descriptionKey)}
        </Typography>
      </div>

      <div className={'flex w-21 shrink-0 flex-col gap-0.5 items-start'}>
        {isOptionalComingSoon ? (
          <ActivationPackageStatusBadge statusLabelKey={'activation.packageStatus.optional'} />
        ) : (
          <>
            <ActivationPackageStatusBadge statusLabelKey={statusLabelKey} />
            <ActivationPackageCta action={action} onClick={handleAction} />
          </>
        )}
      </div>
    </div>
  );
};
