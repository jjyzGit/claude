import {
  Button,
  Divider,
  Icon,
  FieldDatePicker,
  FieldSelect,
  Input,
  Table,
  nodeColumn
} from '@sollapay/ui/components';
import {formatDateLocalized} from '@sollapay/utils';
import {useMemo, type FC} from 'react';
import {useTranslation} from 'react-i18next';

import {MoreMenu} from '@/components';

export interface BeneficiaryRow {
  name: string;
  role: string;
  idNumber: string;
  date: string;
  address: string;
  isRoleDisabled?: boolean;
}

interface BeneficiariesTableProps {
  beneficiaries: BeneficiaryRow[];
  onAddParty?: () => void;
  onEditRow?: (beneficiary: BeneficiaryRow) => void;
  onDeleteRow?: (beneficiary: BeneficiaryRow) => void;
}

export const BeneficiariesTable: FC<BeneficiariesTableProps> = ({
  beneficiaries,
  onAddParty,
  onEditRow,
  onDeleteRow
}) => {
  const {t, i18n} = useTranslation('trustAccounts');

  const roleOptions = useMemo(
    () => [
      {value: 'developer', label: t('view.beneficiaries.roles.developer')},
      {value: 'buyer', label: t('view.beneficiaries.roles.buyer')}
    ],
    [t]
  );

  const columns = useMemo(
    () => [
      nodeColumn<BeneficiaryRow>({
        id: 'name',
        header: t('view.beneficiaries.columns.name'),
        accessorFn: row => row.name,
        cell: row => (
          <Input
            defaultValue={row.name}
            placeholder={t('view.beneficiaries.placeholders.name')}
            readOnly
          />
        )
      }),
      nodeColumn<BeneficiaryRow>({
        id: 'role',
        header: t('view.beneficiaries.columns.role'),
        accessorFn: row => row.role,
        cell: row => <FieldSelect value={row.role} options={roleOptions} disabled />,
        width: 160
      }),
      nodeColumn<BeneficiaryRow>({
        id: 'idNumber',
        header: t('view.beneficiaries.columns.idNumber'),
        accessorFn: row => row.idNumber,
        cell: row => (
          <Input
            defaultValue={row.idNumber}
            placeholder={t('view.beneficiaries.placeholders.idNumber')}
            readOnly
          />
        )
      }),
      nodeColumn<BeneficiaryRow>({
        id: 'date',
        header: t('view.beneficiaries.columns.date'),
        accessorFn: row => row.date,
        cell: row => (
          <FieldDatePicker
            value={row.date ?? undefined}
            placeholder={t('view.beneficiaries.placeholders.date')}
            formatDate={date => formatDateLocalized(date.toISOString(), i18n.language)}
            readOnly
          />
        ),
        width: 220
      }),
      nodeColumn<BeneficiaryRow>({
        id: 'address',
        header: t('view.beneficiaries.columns.address'),
        accessorFn: row => row.address,
        cell: row => (
          <Input
            defaultValue={row.address}
            placeholder={t('view.beneficiaries.placeholders.address')}
            readOnly
          />
        )
      }),
      nodeColumn<BeneficiaryRow>({
        id: 'menu',
        header: '',
        width: 'min',
        cell: row => (
          <MoreMenu
            onEdit={() => onEditRow?.(row)}
            onDelete={row.role !== 'developer' ? () => onDeleteRow?.(row) : undefined}
            editLabel={t('view.beneficiaries.tableActions.edit')}
            deleteLabel={t('view.beneficiaries.tableActions.delete')}
          />
        )
      })
    ],
    [onEditRow, onDeleteRow, roleOptions, t, i18n.language]
  );

  const footer = (
    <div>
      <Divider />
      <div className="flex items-center justify-start px-6 py-4">
        <Button variant="linkColor" size="sm" icon={<Icon name="add" />} onClick={onAddParty}>
          {t('view.beneficiaries.addParty')}
        </Button>
      </div>
    </div>
  );

  return <Table columns={columns} data={beneficiaries} footer={footer} />;
};

export type {BeneficiariesTableProps};
