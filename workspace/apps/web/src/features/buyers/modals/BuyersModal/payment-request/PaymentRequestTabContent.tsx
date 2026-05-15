import {InitiationMethod} from '@sollapay/enums';
import {Button, FieldMoneyInput, FieldSelect, IconBox, Typography} from '@sollapay/ui/components';
import {formatNIS, parseMoney} from '@sollapay/utils';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {config} from '@/app/app.config';
import {FormShell} from '@/components';

import type {FC} from 'react';

interface AmountValidationParams {
  allowCustom: boolean;
  amountTouched: boolean;
  amountNis: string;
  maxAmountNis?: string;
  remainingAmountNis?: string;
  t: (key: string, opts?: Record<string, unknown>) => string;
  prefix: string;
}

function getAmountError({
  allowCustom,
  amountTouched,
  amountNis,
  maxAmountNis,
  remainingAmountNis,
  t,
  prefix
}: AmountValidationParams): string | undefined {
  if (!allowCustom || !amountTouched) return undefined;
  if (!amountNis || amountNis === '0') return t(`${prefix}.errors.amountRequired`);
  const amount = parseMoney(amountNis);
  if (amount.toNumber() <= 0) return t(`${prefix}.errors.amountAboveZero`);
  if (maxAmountNis) {
    const max = parseMoney(maxAmountNis);
    if (amount.toNumber() > max.toNumber())
      return t(`${prefix}.errors.amountExceedsMax`, {max: formatNIS(max)});
  }
  if (remainingAmountNis) {
    const remaining = parseMoney(remainingAmountNis);
    if (amount.toNumber() > remaining.toNumber())
      return t(`${prefix}.errors.amountExceedsRemaining`, {remaining: formatNIS(remaining)});
  }
  return undefined;
}

function getAmountHint(
  allowCustom: boolean,
  maxAmountNis: string | undefined,
  remainingAmountNis: string | undefined,
  t: (key: string, opts?: Record<string, unknown>) => string,
  prefix: string
): string {
  if (!allowCustom) return t(`${prefix}.percentOfPrice`);
  if (remainingAmountNis && maxAmountNis && remainingAmountNis !== maxAmountNis)
    return t(`${prefix}.amountRemainingHint`, {
      remaining: formatNIS(remainingAmountNis)
    });
  if (maxAmountNis) return t(`${prefix}.amountHint`, {max: formatNIS(maxAmountNis)});
  return t(`${prefix}.percentOfPrice`);
}

export interface BuyerOption {
  id: string;
  fullName: string;
}

export interface PaymentRequestTabContentProps {
  amountNis: string;
  onAmountChange?: (value: string) => void;
  /** Max collectable = 7% of purchase price */
  maxAmountNis?: string;
  /** Remaining allowed = maxCollectable - already sent (non-terminal) */
  remainingAmountNis?: string;
  /** Unit display label shown as the header (e.g. "דירה 12, קומה 3") */
  unitLabel?: string;
  /** All buyers for this purchase — shown in the buyer select */
  buyers: BuyerOption[];
  /** Currently selected buyer ID */
  selectedBuyerId: string;
  onBuyerChange: (buyerId: string) => void;
  initiationMethod: InitiationMethod | '';
  onInitiationMethodChange: (value: InitiationMethod) => void;
  saveError?: unknown;
}

export const PaymentRequestTabContent: FC<PaymentRequestTabContentProps> = ({
  amountNis,
  onAmountChange,
  maxAmountNis,
  remainingAmountNis,
  unitLabel,
  buyers,
  selectedBuyerId,
  onBuyerChange,
  initiationMethod,
  onInitiationMethodChange,
  saveError
}) => {
  const {t} = useTranslation('trustAccounts');
  const prefix = 'view.buyers.paymentRequest';
  const allowCustom = config.features.allowCustomPaymentAmount;
  const [amountTouched, setAmountTouched] = useState(false);

  const paymentMethodOptions = [
    {value: InitiationMethod.RTP, label: t(`${prefix}.methods.rtp`)},
    {
      value: InitiationMethod.MANUAL_BRANCH_TRANSFER,
      label: t(`${prefix}.methods.manual_branch_transfer`)
    }
  ];

  const buyerOptions = buyers.map(b => ({value: b.id, label: b.fullName}));

  const handleMaxClick = useCallback(() => {
    if (!onAmountChange || !remainingAmountNis) return;
    setAmountTouched(true);
    onAmountChange(remainingAmountNis);
  }, [onAmountChange, remainingAmountNis]);

  const showMaxButton =
    allowCustom &&
    !!onAmountChange &&
    !!remainingAmountNis &&
    parseMoney(remainingAmountNis).toNumber() > 0 &&
    (!amountNis || parseMoney(amountNis).lt(parseMoney(remainingAmountNis)));

  const amountError = getAmountError({
    allowCustom,
    amountTouched,
    amountNis,
    maxAmountNis,
    remainingAmountNis,
    t,
    prefix
  });

  const amountHint = getAmountHint(allowCustom, maxAmountNis, remainingAmountNis, t, prefix);

  return (
    <FormShell
      id="payment-request-form"
      className="flex flex-col gap-6 py-6"
      onSubmit={e => e.preventDefault()}
      saveError={saveError}
    >
      {unitLabel && (
        <div className="flex items-center gap-2">
          <IconBox icon="building" size="sm" iconColor="tertiary" />
          <Typography size="lg" weight="semibold">
            {unitLabel}
          </Typography>
        </div>
      )}
      <FieldSelect
        label={t(`${prefix}.buyerName`)}
        placeholder={t(`${prefix}.buyerNamePlaceholder`)}
        options={buyerOptions}
        value={selectedBuyerId}
        onValueChange={onBuyerChange}
        disabled={buyerOptions.length <= 1}
        required
      />
      <FieldSelect
        label={t(`${prefix}.paymentMethod`)}
        placeholder={t(`${prefix}.paymentMethodPlaceholder`)}
        options={paymentMethodOptions}
        value={initiationMethod}
        onValueChange={val => onInitiationMethodChange(val as InitiationMethod)}
        required
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <FieldMoneyInput
            label={t(`${prefix}.amount`)}
            value={amountNis}
            onChange={
              allowCustom && onAmountChange
                ? (val: string) => {
                    setAmountTouched(true);
                    onAmountChange(val);
                  }
                : () => {}
            }
            required
            disabled={!allowCustom}
            error={amountError}
            className={showMaxButton ? 'pe-24' : undefined}
            badge={
              <div className="flex items-center gap-1.5">
                {showMaxButton && (
                  <Button type="button" variant="secondary" size="xs" onClick={handleMaxClick}>
                    {t(`${prefix}.maxButton`)}
                  </Button>
                )}
                <span className="text-sm font-medium text-fg-tertiary">₪</span>
              </div>
            }
          />
          <Typography size="xs" color="tertiary">
            {amountHint}
          </Typography>
        </div>
        <FieldSelect
          label={t(`${prefix}.numberOfPayments`)}
          options={[{value: '1', label: '1'}]}
          value="1"
          onValueChange={() => {}}
          required
          disabled
        />
      </div>
    </FormShell>
  );
};
