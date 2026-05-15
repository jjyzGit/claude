import {TransactionGroupBy} from '@sollapay/enums';
import {Popover, PopoverContent, PopoverTrigger, Button, Icon} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

interface TransactionsGroupBySelectorProps {
  value: TransactionGroupBy;
  onChange: (groupBy: TransactionGroupBy) => void;
}

const GROUP_BY_OPTIONS: TransactionGroupBy[] = [
  TransactionGroupBy.DATE,
  TransactionGroupBy.COUNTERPARTY,
  TransactionGroupBy.PURCHASE,
  TransactionGroupBy.STATUS,
  TransactionGroupBy.INITIATION_METHOD,
  TransactionGroupBy.DIRECTION
];

export const TransactionsGroupBySelector: FC<TransactionsGroupBySelectorProps> = ({
  value,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="secondary" icon={<Icon name="bar-chart" />}>
            {t('view.transactions.groupBy.label')}: {t(`view.transactions.groupBy.${value}`)}
          </Button>
        }
      />
      <PopoverContent className="w-48 p-1" align="end">
        <div data-slot="group-by-menu" className="flex flex-col">
          {GROUP_BY_OPTIONS.map(option => (
            <Button
              key={option}
              variant="tertiary"
              size="sm"
              data-slot="group-by-option"
              onClick={() => onChange(option)}
              className="w-full justify-between"
            >
              {t(`view.transactions.groupBy.${option}`)}
              {value === option && (
                <Icon name="check-circle" className="size-4 text-brand-primary" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export type {TransactionsGroupBySelectorProps};
