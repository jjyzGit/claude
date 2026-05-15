import {Slider, Typography} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

const MAX_DEPOSIT_NIS = 500_000;
const STEP = 1_000;

export interface DepositRange {
  min: number;
  max: number;
}

export interface BuyerFilterDepositRangeSectionProps {
  depositRange?: DepositRange;
  onChange: (range: DepositRange | undefined) => void;
}

export const BuyerFilterDepositRangeSection: FC<BuyerFilterDepositRangeSectionProps> = ({
  depositRange,
  onChange
}) => {
  const {t} = useTranslation('trustAccounts');

  const sliderMin = depositRange?.min ?? 0;
  const sliderMax =
    depositRange?.max === undefined || depositRange.max === Infinity
      ? MAX_DEPOSIT_NIS
      : Math.min(depositRange.max, MAX_DEPOSIT_NIS);

  const handleSliderChange = (values: number | readonly number[]) => {
    const [min, max] = (Array.isArray(values) ? values : [values, values]) as [number, number];
    if (min === 0 && max === MAX_DEPOSIT_NIS) {
      onChange(undefined);
    } else {
      onChange({min, max: max === MAX_DEPOSIT_NIS ? Infinity : max});
    }
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? 0 : Number(e.target.value);
    const currentMax = depositRange?.max ?? Infinity;
    if (val === 0 && currentMax === Infinity) {
      onChange(undefined);
    } else {
      onChange({min: val, max: currentMax});
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? Infinity : Number(e.target.value);
    const currentMin = depositRange?.min ?? 0;
    if (currentMin === 0 && val === Infinity) {
      onChange(undefined);
    } else {
      onChange({min: currentMin, max: val});
    }
  };

  return (
    <>
      <div className="px-3 pb-1 pt-2">
        <Typography size="xs" weight="semibold" color="tertiary">
          {t('view.buyers.list.filter.sections.depositRange')}
        </Typography>
      </div>
      <div className="flex flex-col gap-3 px-3 pb-2 pt-1">
        <Slider
          min={0}
          max={MAX_DEPOSIT_NIS}
          step={STEP}
          value={[sliderMin, sliderMax]}
          onValueChange={handleSliderChange}
        />
        <div className="flex items-start gap-2">
          <div className="flex flex-1 flex-col gap-1.5">
            <Typography size="xs" weight="medium" color="secondary">
              {t('view.buyers.list.filter.depositRange.from')}
            </Typography>
            <div className="relative">
              <span
                data-slot="icon"
                className="pointer-events-none absolute inset-e-2 top-1/2 -translate-y-1/2 text-xs text-fg-tertiary"
              >
                ₪
              </span>
              <input
                type="number"
                min={0}
                max={MAX_DEPOSIT_NIS}
                value={sliderMin > 0 ? sliderMin : ''}
                onChange={handleMinInput}
                className="input-base h-9 w-full pe-6 text-sm"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Typography size="xs" weight="medium" color="secondary">
              {t('view.buyers.list.filter.depositRange.to')}
            </Typography>
            <div className="relative">
              <span
                data-slot="icon"
                className="pointer-events-none absolute inset-e-2 top-1/2 -translate-y-1/2 text-xs text-fg-tertiary"
              >
                ₪
              </span>
              <input
                type="number"
                min={0}
                value={
                  depositRange?.max !== undefined && depositRange.max !== Infinity
                    ? depositRange.max
                    : ''
                }
                onChange={handleMaxInput}
                className="input-base h-9 w-full pe-6 text-sm"
                placeholder="∞"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
