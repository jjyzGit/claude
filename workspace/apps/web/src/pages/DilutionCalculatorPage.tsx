import {cn, Input, Slider, Typography} from '@sollapay/ui';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

const INVESTMENT_MIN = 1;
const INVESTMENT_MAX = 5;
const INVESTMENT_STEP = 0.1;
const INVESTMENT_DEFAULT = 2.5;
const POST_MONEY_MIN = 8;
const POST_MONEY_MAX = 25;
const POST_MONEY_STEP = 0.5;
const POST_MONEY_DEFAULT = 12;
const DILUTION_CAP = 20;

export const DilutionCalculatorPage: FC = () => {
  const {t} = useTranslation('dilutionCalculator');
  const [investment, setInvestment] = useState(INVESTMENT_DEFAULT);
  const [postMoney, setPostMoney] = useState(POST_MONEY_DEFAULT);

  const ownership = (investment / postMoney) * 100;
  const preMoney = postMoney - investment;
  const isExceeded = ownership > DILUTION_CAP;

  return (
    <div className="dark flex-1 bg-background-overlay flex flex-col overflow-auto">
      <div className="max-w-3xl w-full mx-auto py-12 px-8 flex flex-col gap-10">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Typography
              size="xs"
              color="tertiary"
              className="font-mono tracking-[0.2em] uppercase mb-1"
            >
              {t('subtitle')}
            </Typography>
            <Typography
              as="h1"
              className="font-mono text-2xl font-bold tracking-[0.06em] uppercase text-fg"
            >
              {t('title')}
            </Typography>
          </div>
          <div
            data-slot="status-badge"
            className={cn(
              'shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-radius border text-xs font-mono font-semibold tracking-[0.08em] uppercase',
              isExceeded
                ? 'bg-background-error border-border-error text-text-error'
                : 'bg-background-success border-border-success text-text-success'
            )}
          >
            <span data-slot="status-icon">{isExceeded ? '▲' : '●'}</span>
            <span data-slot="status-text">{isExceeded ? t('statusExceeded') : t('statusOk')}</span>
          </div>
        </header>

        <div className="border-t border-border" />

        <section className="flex flex-col gap-8">
          <InputControl
            label={t('investmentAmount')}
            value={investment}
            displayValue={`$${investment.toFixed(1)}M`}
            min={INVESTMENT_MIN}
            max={INVESTMENT_MAX}
            step={INVESTMENT_STEP}
            onSliderChange={raw => {
              const v = Array.isArray(raw) ? raw[0] : raw;
              if (v !== undefined) setInvestment(v);
            }}
            onInputChange={val =>
              setInvestment(Math.min(INVESTMENT_MAX, Math.max(INVESTMENT_MIN, val)))
            }
          />
          <InputControl
            label={t('postMoneyValuation')}
            value={postMoney}
            displayValue={`$${postMoney.toFixed(1)}M`}
            min={POST_MONEY_MIN}
            max={POST_MONEY_MAX}
            step={POST_MONEY_STEP}
            onSliderChange={raw => {
              const v = Array.isArray(raw) ? raw[0] : raw;
              if (v !== undefined) setPostMoney(v);
            }}
            onInputChange={val =>
              setPostMoney(Math.min(POST_MONEY_MAX, Math.max(POST_MONEY_MIN, val)))
            }
          />
        </section>

        <div className="border-t border-border" />

        <section className="grid grid-cols-3 gap-4">
          <div
            data-slot="result-card"
            className="flex flex-col rounded-lg border border-border bg-background-surface p-6"
          >
            <Typography
              size="xs"
              color="tertiary"
              className="font-mono tracking-[0.15em] uppercase mb-4"
            >
              {t('ownership')}
            </Typography>
            <Typography
              as="div"
              dir="ltr"
              className={cn(
                'font-mono text-5xl font-bold mb-2',
                isExceeded ? 'text-text-error' : 'text-text-success'
              )}
            >
              {ownership.toFixed(1)}%
            </Typography>
            <Typography size="xs" color="tertiary" className="font-mono" dir="ltr">
              {t('ofPostMoney', {amount: `$${postMoney.toFixed(1)}M`})}
            </Typography>
          </div>

          <div
            data-slot="result-card"
            className="flex flex-col rounded-lg border border-border bg-background-surface p-6"
          >
            <Typography
              size="xs"
              color="tertiary"
              className="font-mono tracking-[0.15em] uppercase mb-4"
            >
              {t('preMoney')}
            </Typography>
            <Typography as="div" dir="ltr" className="font-mono text-5xl font-bold text-fg mb-2">
              ${preMoney.toFixed(1)}M
            </Typography>
            <Typography size="xs" color="tertiary" className="font-mono">
              {t('postMoneyMinusInvestment')}
            </Typography>
          </div>

          <div
            data-slot="result-card"
            className={cn(
              'flex flex-col rounded-lg border bg-background-surface p-6',
              isExceeded ? 'border-border-error' : 'border-border-success'
            )}
          >
            <Typography
              size="xs"
              className={cn(
                'font-mono tracking-[0.15em] uppercase mb-4',
                isExceeded ? 'text-text-error' : 'text-text-success'
              )}
            >
              {isExceeded ? t('warningTitle') : t('withinTitle')}
            </Typography>
            <Typography size="sm" color="secondary" className="font-mono">
              {isExceeded ? t('warningBody') : t('withinBody')}
            </Typography>
          </div>
        </section>
      </div>
    </div>
  );
};

interface InputControlProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onSliderChange: (val: number | readonly number[]) => void;
  onInputChange: (val: number) => void;
}

const InputControl = ({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onSliderChange,
  onInputChange
}: InputControlProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <Typography size="xs" color="tertiary" className="font-mono tracking-[0.15em] uppercase">
        {label}
      </Typography>
      <Typography size="sm" weight="semibold" className="font-mono" dir="ltr">
        {displayValue}
      </Typography>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={raw => onSliderChange(raw)}
        />
      </div>
      <Input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        dir="ltr"
        className="w-24 text-end font-mono"
        onChange={e => {
          const parsed = parseFloat(e.target.value);
          if (!isNaN(parsed)) onInputChange(parsed);
        }}
      />
    </div>
  </div>
);
