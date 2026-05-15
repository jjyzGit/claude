import {Button, FormSectionHeading, Icon} from '@sollapay/ui/components';
import {useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {EMPTY_BUYER_ENTRY} from '@/features/buyers/validation';

import {BuyerPersonFields} from './BuyerPersonFields';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {FC, ReactNode} from 'react';
import type {UseFormReturn} from 'react-hook-form';

export interface BuyerDetailsSectionProps {
  form: UseFormReturn<CreateBuyerFormValues>;
  aiFields: Map<string, AiSuggestion>;
  markFieldModified: (field: string) => void;
  trailing?: ReactNode;
}

export const BuyerDetailsSection: FC<BuyerDetailsSectionProps> = ({
  form,
  aiFields,
  markFieldModified,
  trailing
}) => {
  const {t} = useTranslation('trustAccounts');
  const prefix = 'view.buyers.addBuyerModal.buyerDetails';

  const {fields, append, remove, replace} = useFieldArray({control: form.control, name: 'buyers'});

  // Auto-grow rows when AI has extracted data for buyers beyond the current field count.
  // Fill-empty-only: useFormShell's setValue is called per-field; existing user input is
  // preserved because the extraction processingMode is WHEN_FIELDS_EMPTY at the schema level.
  useEffect(() => {
    const buyerIndices = [...aiFields.keys()]
      .map(k => k.match(/^buyers\.(\d+)\./))
      .filter((m): m is RegExpMatchArray => m !== null)
      .map(m => parseInt(m[1] ?? '0', 10));

    if (buyerIndices.length === 0) return;

    const maxIndex = Math.max(...buyerIndices);
    const neededLength = maxIndex + 1;
    if (fields.length >= neededLength) return;

    const currentBuyers = form.getValues('buyers');
    if (currentBuyers.length >= neededLength) {
      replace(currentBuyers);
    } else {
      const toAppend = neededLength - currentBuyers.length;
      for (let i = 0; i < toAppend; i++) {
        append(EMPTY_BUYER_ENTRY, {shouldFocus: false});
      }
    }
  }, [aiFields, fields.length, form, replace, append]);

  return (
    <div className="flex flex-col gap-4">
      <FormSectionHeading title={t(`${prefix}.title`)} trailing={trailing} />

      {fields.map((field, index) => (
        <BuyerRow
          key={field.id}
          form={form}
          index={index}
          totalBuyers={fields.length}
          aiFields={aiFields}
          markFieldModified={markFieldModified}
          onRemove={() => remove(index)}
          removeLabel={t(`${prefix}.removeBuyer`, {number: index + 1})}
        />
      ))}

      <BuyerActionDivider
        icon={<Icon name="invite-user" width={20} height={20} />}
        label={t(`${prefix}.addBuyer`)}
        onClick={() => append(EMPTY_BUYER_ENTRY, {shouldFocus: false})}
      />
    </div>
  );
};

interface BuyerActionDividerProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const BuyerActionDivider: FC<BuyerActionDividerProps> = ({icon, label, onClick}) => (
  <div className="flex items-center gap-2">
    <div className="h-px flex-1 bg-border-subtle" data-slot="divider" />
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onClick}
      icon={icon}
      iconPosition="end"
    >
      {label}
    </Button>
    <div className="h-px flex-1 bg-border-subtle" data-slot="divider" />
  </div>
);

interface BuyerRowProps {
  form: UseFormReturn<CreateBuyerFormValues>;
  index: number;
  totalBuyers: number;
  aiFields: Map<string, AiSuggestion>;
  markFieldModified: (field: string) => void;
  onRemove: () => void;
  removeLabel: string;
}

const BuyerRow: FC<BuyerRowProps> = ({
  form,
  index,
  totalBuyers,
  aiFields,
  markFieldModified,
  onRemove,
  removeLabel
}) => {
  const {t} = useTranslation('trustAccounts');
  const prefix = 'view.buyers.addBuyerModal.buyerDetails';

  return (
    <div className="flex flex-col gap-4">
      {index > 0 && (
        <BuyerActionDivider
          icon={<Icon name="remove-user" width={20} height={20} />}
          label={removeLabel}
          onClick={onRemove}
        />
      )}

      {totalBuyers > 1 && (
        <span className="text-sm font-medium text-text-secondary">
          {t(`${prefix}.buyerNumber`, {number: index + 1})}
        </span>
      )}

      <BuyerPersonFields
        form={form}
        index={index}
        aiFields={aiFields}
        markFieldModified={markFieldModified}
      />
    </div>
  );
};
