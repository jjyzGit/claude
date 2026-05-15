import {Badge, Breadcrumbs} from '@sollapay/ui/components';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {PageHeader} from '@/layouts';

import {BuyerMetaInfo} from './BuyerMetaInfo';
import {formatBuyerDisplayName} from '../../utils';

import type {BuyerWithDocumentsDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerViewHeaderProps {
  buyer: BuyerWithDocumentsDTO;
  trustAccountId: string;
  trustAccountName: string;
}

export const BuyerViewHeader: FC<BuyerViewHeaderProps> = ({
  buyer,
  trustAccountId,
  trustAccountName
}) => {
  const {t} = useTranslation('trustAccounts');
  const navigate = useNavigate();

  const displayName = formatBuyerDisplayName(buyer.fullName);

  const breadcrumbSteps = useMemo(
    () => [
      {icon: 'shield' as const, onClick: () => navigate('/'), ariaLabel: t('title')},
      {title: t('title'), onClick: () => navigate('/trust-accounts')},
      {title: trustAccountName, onClick: () => navigate(`/trust-accounts/${trustAccountId}`)},
      {
        title: t('view.buyers.list.header.title'),
        onClick: () => navigate(`/trust-accounts/${trustAccountId}/buyers`)
      },
      {title: displayName, isActive: true}
    ],
    [trustAccountId, trustAccountName, displayName, navigate, t]
  );

  return (
    <PageHeader
      data-slot="buyer-view-header"
      title={displayName}
      badge={
        <Badge variant="success" size="sm" dot>
          {t('statuses.buyerActive')}
        </Badge>
      }
      breadcrumbs={<Breadcrumbs steps={breadcrumbSteps} />}
      description={<BuyerMetaInfo buyer={buyer} />}
    />
  );
};
