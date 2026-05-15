import {ContentSection} from '@sollapay/ui/components';
import {useRef, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {ListExportMenu} from '@/components';
import {AddBuyerFlow} from '@/features/buyers/modals';
import {useBeneficiariesQuery} from '@/features/trust-accounts/hooks';

import {BeneficiariesTabContentSkeleton} from './BeneficiariesTabContent.skeleton';
import {BeneficiariesTable} from './BeneficiariesTable';
import {createBeneficiaryExportColumns} from './beneficiary-export.config';

import type {BeneficiaryRow} from './BeneficiariesTable';
import type {TrustAccountTabContext} from '../../TrustAccountView';
import type {FC} from 'react';

interface BeneficiariesTabContentProps {
  trustAccount: TrustAccountTabContext;
}

function mapToRow(
  b: NonNullable<ReturnType<typeof useBeneficiariesQuery>['data']>[number]
): BeneficiaryRow {
  return {
    name: b.fullName,
    role: b.role,
    idNumber: b.identifier,
    date: b.establishedDate,
    address: b.address,
    isRoleDisabled: true
  };
}

export const BeneficiariesTabContent: FC<BeneficiariesTabContentProps> = ({
  trustAccount: {id: trustAccountId, refId: trustAccountRefId, name: trustAccountName}
}) => {
  const beneficiariesQuery = useBeneficiariesQuery(trustAccountId);
  const {t, i18n} = useTranslation('trustAccounts');
  const openAddBuyerRef = useRef<(() => void) | null>(null);

  const beneficiaries = useMemo(
    () => (beneficiariesQuery.data ?? []).map(mapToRow),
    [beneficiariesQuery.data]
  );

  const beneficiaryExportColumns = useMemo(
    () => createBeneficiaryExportColumns(t, i18n.language),
    [t, i18n.language]
  );

  if (beneficiariesQuery.isLoading) {
    return <BeneficiariesTabContentSkeleton />;
  }

  return (
    <ContentSection
      title={t('view.beneficiaries.title')}
      subtitle={t('view.beneficiaries.subtitle')}
      action={
        <ListExportMenu<BeneficiaryRow>
          rows={beneficiaries}
          columns={beneficiaryExportColumns}
          refId={trustAccountRefId}
          entity="beneficiaries"
          sheetName={trustAccountName}
          disabled={beneficiaries.length === 0}
        />
      }
    >
      <AddBuyerFlow
        trustAccountId={trustAccountId}
        trigger={onOpen => {
          openAddBuyerRef.current = onOpen;
          return null;
        }}
      />
      <BeneficiariesTable
        beneficiaries={beneficiaries}
        onAddParty={() => openAddBuyerRef.current?.()}
      />
    </ContentSection>
  );
};

export type {BeneficiariesTabContentProps};
