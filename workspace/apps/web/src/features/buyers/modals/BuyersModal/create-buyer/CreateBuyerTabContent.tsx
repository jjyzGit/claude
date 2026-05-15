import {FormShell} from '@/components';
import {AiExtractionStatus} from '@/features/ai-extraction';
import {useScrollToTopOnError} from '@/hooks';

import {BuyerDetailsSection} from './BuyerDetailsSection';
import {DocumentUploadSection} from './DocumentUploadSection';
import {UnitAttachmentsSection} from './UnitAttachmentsSection';
import {UnitDetailsSection} from './UnitDetailsSection';

import type {AiSuggestion} from '@/features/ai-extraction';
import type {CreateBuyerFormValues} from '@/features/buyers/validation';
import type {FC} from 'react';
import type {UseFormReturn} from 'react-hook-form';

export interface CreateBuyerTabContentProps {
  trustAccountId: string;
  form: UseFormReturn<CreateBuyerFormValues>;
  onDocumentsChange: (documentIds: string[]) => void;
  saveError?: unknown;
  aiFields: Map<string, AiSuggestion>;
  isProcessing: boolean;
  suggestionsCount: number;
  markFieldModified: (field: string) => void;
}

export const CreateBuyerTabContent: FC<CreateBuyerTabContentProps> = ({
  trustAccountId,
  form,
  onDocumentsChange,
  saveError,
  aiFields,
  isProcessing,
  suggestionsCount,
  markFieldModified
}) => {
  useScrollToTopOnError(saveError);

  return (
    <FormShell
      className="flex flex-col gap-8 py-4 px-6"
      id="create-buyer-form"
      onSubmit={e => e.preventDefault()}
      saveError={saveError}
    >
      <DocumentUploadSection
        trustAccountId={trustAccountId}
        onDocumentsChange={onDocumentsChange}
      />
      <BuyerDetailsSection
        form={form}
        aiFields={aiFields}
        markFieldModified={markFieldModified}
        trailing={
          <AiExtractionStatus isProcessing={isProcessing} suggestionsCount={suggestionsCount} />
        }
      />
      <UnitDetailsSection form={form} aiFields={aiFields} markFieldModified={markFieldModified} />
      <UnitAttachmentsSection form={form} aiFields={aiFields} />
    </FormShell>
  );
};
