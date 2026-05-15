import {UnitAttachmentType} from '@sollapay/enums';
import {cn} from '@sollapay/ui';
import {
  AiBadge,
  Button,
  FieldInput,
  FieldSelect,
  FormSectionHeading,
  Icon
} from '@sollapay/ui/components';
import {useEffect} from 'react';
import {useFieldArray} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {FC} from 'react';
import type {UseFormReturn} from 'react-hook-form';

export interface UnitAttachmentsSectionProps {
  form: UseFormReturn<CreateBuyerFormValues>;
  aiFields: Map<string, AiSuggestion>;
}

export const UnitAttachmentsSection: FC<UnitAttachmentsSectionProps> = ({form, aiFields}) => {
  const {t} = useTranslation('trustAccounts');
  const {
    register,
    control,
    formState: {errors}
  } = form;

  const {fields, append, remove, replace} = useFieldArray({control, name: 'unit.attachments'});

  const prefix = 'view.buyers.addBuyerModal.attachments';

  const attachmentTypeOptions = [
    {value: UnitAttachmentType.Balcony, label: t(`${prefix}.types.balcony`)},
    {value: UnitAttachmentType.Yard, label: t(`${prefix}.types.yard`)},
    {value: UnitAttachmentType.Parking, label: t(`${prefix}.types.parking`)},
    {value: UnitAttachmentType.Storage, label: t(`${prefix}.types.storage`)},
    {value: UnitAttachmentType.Other, label: t(`${prefix}.types.other`)}
  ];

  // When AI fills attachment fields, sync useFieldArray with the populated form values.
  useEffect(() => {
    const hasAiAttachments = [...aiFields.keys()].some(k => k.startsWith('unit.attachments'));
    if (hasAiAttachments) {
      const formAttachments = form.getValues('unit.attachments');
      if (formAttachments.length > fields.length) {
        replace(formAttachments);
      }
    }
  }, [aiFields, fields.length, form, replace]);

  return (
    <div className="flex flex-col gap-4">
      <FormSectionHeading title={t(`${prefix}.title`)} />

      {fields.length > 0 && (
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 items-start">
              <FieldSelect
                label={index === 0 ? t(`${prefix}.type`) : undefined}
                placeholder={t(`${prefix}.typePlaceholder`)}
                options={attachmentTypeOptions}
                value={form.watch(`unit.attachments.${index}.type`)}
                onValueChange={val =>
                  form.setValue(`unit.attachments.${index}.type`, val as UnitAttachmentType, {
                    shouldValidate: true
                  })
                }
                required
                badge={aiFields.has(`unit.attachments.${index}.type`) ? <AiBadge /> : undefined}
              />
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <FieldInput
                    label={index === 0 ? t(`${prefix}.description`) : undefined}
                    placeholder={t(`${prefix}.descriptionPlaceholder`)}
                    error={errors.unit?.attachments?.[index]?.description?.message}
                    startAdornment={<Icon name="pen" width={16} height={16} />}
                    badge={
                      aiFields.has(`unit.attachments.${index}.description`) &&
                      !!form.watch(`unit.attachments.${index}.description`) ? (
                        <AiBadge />
                      ) : undefined
                    }
                    {...register(`unit.attachments.${index}.description`)}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  aria-label={t(`${prefix}.remove`)}
                  className={cn('h-10', index === 0 && 'mt-6.5')}
                >
                  <Icon name="x-close" width={16} height={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => append({type: UnitAttachmentType.Parking, description: ''})}
        icon={<Icon name="add" width={14} height={14} />}
        iconPosition="start"
      >
        {t(`${prefix}.add`)}
      </Button>
    </div>
  );
};
