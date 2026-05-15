import {cn} from '@sollapay/ui';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

export interface BuyerUnitTabsProps {
  units: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const BuyerUnitTabs = memo<BuyerUnitTabsProps>(function BuyerUnitTabs({
  units,
  selectedIndex,
  onSelect
}) {
  const {t} = useTranslation('trustAccounts');

  return (
    <div
      role="tablist"
      aria-label={t('view.buyers.detail.purchasedUnits')}
      className="relative flex w-fit gap-1 rounded-lg border border-border bg-background-secondary/60 p-[5px]"
    >
      {units.map((unit, i) => (
        <button
          key={unit}
          type="button"
          role="tab"
          aria-selected={i === selectedIndex}
          onClick={() => onSelect(i)}
          className={cn(
            'cursor-pointer rounded-md px-5 py-1.5 text-sm transition-colors',
            i === selectedIndex
              ? 'border border-border bg-background-surface font-medium text-fg shadow-xs'
              : 'text-fg-tertiary hover:text-fg'
          )}
        >
          {unit}
        </button>
      ))}
    </div>
  );
});
