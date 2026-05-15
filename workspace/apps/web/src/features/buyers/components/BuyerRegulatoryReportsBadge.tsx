import {cn} from '@sollapay/ui';
import {Badge, Button, Icon, Popover, PopoverTrigger} from '@sollapay/ui/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {BuyerRegulatoryReportsPopover} from './BuyerRegulatoryReportsPopover';

import type {BuyerPurchaseDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerRegulatoryReportsBadgeProps {
  purchase: BuyerPurchaseDTO;
  trustAccountId: string;
}

export const BuyerRegulatoryReportsBadge: FC<BuyerRegulatoryReportsBadgeProps> = ({
  purchase,
  trustAccountId
}) => {
  const {t} = useTranslation('trustAccounts');
  const {realEstateTaxation, salesLawCommissioner} = purchase.regulatoryReports;
  const completedCount = (realEstateTaxation ? 1 : 0) + (salesLawCommissioner ? 1 : 0);
  const isComplete = completedCount === 2;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="tertiary"
            className="h-auto cursor-pointer gap-1 p-0 hover:bg-transparent"
            onClick={e => e.stopPropagation()}
          >
            <Badge variant={isComplete ? 'success' : 'gray'} size="md" dot={isComplete}>
              {t('view.buyers.regulatoryReports.count', {count: completedCount, total: 2})}
            </Badge>
            <Icon
              name="chevron-down"
              className={cn(
                'size-4 text-fg-tertiary transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </Button>
        }
      />
      <BuyerRegulatoryReportsPopover
        purchaseId={purchase.id}
        trustAccountId={trustAccountId}
        regulatoryReports={purchase.regulatoryReports}
      />
    </Popover>
  );
};
