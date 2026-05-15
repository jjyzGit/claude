import {Breadcrumbs} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import type {FC} from 'react';

interface TrustAccountBreadcrumbsProps {
  /** The current tab label */
  title: string;
  /** The trust account name */
  name?: string;
  /** The trust account ID — when provided, the name becomes a clickable link to the overview */
  trustAccountId?: string;
}

export const TrustAccountBreadcrumbs: FC<TrustAccountBreadcrumbsProps> = ({
  title,
  name,
  trustAccountId
}) => {
  const {t} = useTranslation('trustAccounts');
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      steps={[
        {
          icon: 'shield',
          onClick: () => navigate('/'),
          ariaLabel: t('title')
        },
        {title: t('title'), onClick: () => navigate('/trust-accounts')},
        ...(name
          ? [
              {
                title: name,
                ...(trustAccountId
                  ? {onClick: () => navigate(`/trust-accounts/${trustAccountId}`)}
                  : {})
              }
            ]
          : []),
        {title, isActive: true}
      ]}
    />
  );
};
