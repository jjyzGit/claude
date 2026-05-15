import {
  Button,
  Calendar,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
  calendarLocaleHe
} from '@sollapay/ui/components';
import {useDirection} from '@sollapay/ui/providers';
import {dateToIso, formatDate, isoToDate} from '@sollapay/utils';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import type {TrustAccountDateRange} from '../../utils/filter.utils';
import type {CalendarDateRange} from '@sollapay/ui/components';
import type {FC} from 'react';

export interface TrustAccountFilterDateRangeSectionProps {
  dateRange: TrustAccountDateRange | undefined;
  onChange: (dateRange: TrustAccountDateRange | undefined) => void;
}

export const TrustAccountFilterDateRangeSection: FC<TrustAccountFilterDateRangeSectionProps> = ({
  dateRange,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');
  const dir = useDirection();
  const isRtl = dir === 'rtl';
  const [open, setOpen] = useState(false);

  const label = dateRange
    ? `${formatDate(dateRange.from)} – ${formatDate(dateRange.to)}`
    : t('filter.dateRange.placeholder');

  const handleSelect = (range?: CalendarDateRange) => {
    const from = range?.from ? dateToIso(range.from) : undefined;
    const to = range?.to ? dateToIso(range.to) : undefined;
    onChange(from && to ? {from: isoToDate(from), to: isoToDate(to)} : undefined);
    if (range?.from && range?.to) setOpen(false);
  };

  return (
    <>
      <div className="px-3 pb-1 pt-2">
        <Typography size="xs" weight="semibold" color="tertiary">
          {t('filter.sections.dateRange')}
        </Typography>
      </div>
      <div className="px-2 pb-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="secondary"
                size="sm"
                className="justify-start"
                icon={<Icon name="calendar" />}
              >
                {label}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-3" align="start">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={dateRange ? {from: dateRange.from, to: dateRange.to} : undefined}
              onSelect={handleSelect}
              showOutsideDays
              dir={isRtl ? 'rtl' : 'ltr'}
              locale={isRtl ? calendarLocaleHe : undefined}
              className="p-0"
              classNames={{
                weekday: 'w-8 rounded-md text-[0.8rem] font-normal text-fg-tertiary',
                today: 'bg-background-surface_hover text-fg',
                outside: 'text-fg-tertiary opacity-50',
                disabled: 'text-fg-disabled opacity-50'
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
