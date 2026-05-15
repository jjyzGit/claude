import {cn} from '@sollapay/ui';
import {Checkbox, Icon, PopoverContent, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import {REGULATORY_REPORT_URLS} from '../constants';
import {useUpdateRegulatoryReportsMutation} from '../hooks';

import type {RegulatoryReportsDTO} from '@sollapay/types';
import type {FC} from 'react';

export interface BuyerRegulatoryReportsPopoverProps {
  purchaseId: string;
  trustAccountId: string;
  regulatoryReports: RegulatoryReportsDTO;
}

export const BuyerRegulatoryReportsPopover: FC<BuyerRegulatoryReportsPopoverProps> = ({
  purchaseId,
  trustAccountId,
  regulatoryReports
}) => {
  const {t} = useTranslation('trustAccounts');
  const {mutate, isPending} = useUpdateRegulatoryReportsMutation(trustAccountId);

  return (
    <PopoverContent
      side="bottom"
      align="start"
      className="w-64 p-1.25"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex flex-col items-start gap-0.5 px-2 py-1.5">
        <Typography size="sm" weight="medium">
          {t('view.buyers.regulatoryReports.popover.title')}
        </Typography>
        <div className="flex items-center gap-1">
          <Icon name="check-circle-dashed" className="size-3.5 text-fg-tertiary" />
          <Typography size="xs" color="tertiary">
            {t('view.buyers.regulatoryReports.popover.subtitle')}
          </Typography>
        </div>
      </div>

      <div className="h-px w-full bg-border-subtle" />

      <ReportRow
        checked={regulatoryReports.realEstateTaxation}
        label={t('view.buyers.regulatoryReports.realEstateTaxation.label')}
        host={t('view.buyers.regulatoryReports.realEstateTaxation.host')}
        url={REGULATORY_REPORT_URLS.realEstateTaxation}
        disabled={isPending}
        onToggle={() =>
          mutate({purchaseId, realEstateTaxation: !regulatoryReports.realEstateTaxation})
        }
      />

      <div className="h-px w-full bg-border-subtle" />

      <ReportRow
        checked={regulatoryReports.salesLawCommissioner}
        label={t('view.buyers.regulatoryReports.salesLawCommissioner.label')}
        host={t('view.buyers.regulatoryReports.salesLawCommissioner.host')}
        url={REGULATORY_REPORT_URLS.salesLawCommissioner}
        disabled={isPending}
        onToggle={() =>
          mutate({purchaseId, salesLawCommissioner: !regulatoryReports.salesLawCommissioner})
        }
      />
    </PopoverContent>
  );
};

interface ReportRowProps {
  checked: boolean;
  label: string;
  host: string;
  url: string;
  onToggle: () => void;
  disabled?: boolean;
}

const ReportRow: FC<ReportRowProps> = ({checked, label, host, url, onToggle, disabled}) => (
  <div
    className={cn(
      'flex w-full items-start gap-2 rounded p-1',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-background-secondary'
    )}
    onClick={e => {
      e.stopPropagation();
      if (!disabled) onToggle();
    }}
  >
    <Checkbox checked={checked} className="mt-1" />
    <div className="flex flex-1 flex-col items-start gap-0.5" data-slot="label">
      <Typography size="sm" weight="medium">
        {label}
      </Typography>
      <Typography size="xs" color="tertiary">
        {host}
      </Typography>
    </div>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      className="flex size-4 items-center justify-center text-fg-tertiary hover:text-fg"
      data-slot="external-link"
    >
      <Icon name="link-external-02" className="size-4" />
    </a>
  </div>
);
