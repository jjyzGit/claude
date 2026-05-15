import {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';
import {useForm} from 'react-hook-form';

import {useFormShell} from '@/hooks';

import {EMPTY_CREATE_BUYER_FORM_VALUES} from '../validation';
import {useCreateBuyerMutation} from './useCreateBuyerMutation';

import type {CreateBuyerFormValues} from '../validation';
import type {BuyerDTO} from '@sollapay/types';

/** Document types that feed the AI extraction session for the add-buyer form. */
const BUYER_AI_DOCUMENT_TYPES = [
  DocumentType.BUYER_REGISTRATION_FORM,
  DocumentType.SIGNED_SALE_AGREEMENT
] as const satisfies DocumentType[];

interface UseCreateBuyerFormParams {
  trustAccountId: string;
  uploadedDocumentIds: string[];
  onSuccess: (buyer: BuyerDTO) => void;
}

export const useCreateBuyerForm = ({
  trustAccountId,
  uploadedDocumentIds,
  onSuccess
}: UseCreateBuyerFormParams) => {
  const form = useForm<CreateBuyerFormValues>({
    defaultValues: EMPTY_CREATE_BUYER_FORM_VALUES,
    mode: 'onBlur'
  });

  const createBuyerMutation = useCreateBuyerMutation(trustAccountId);

  const handleSave = form.handleSubmit(async ({buyers, unit, purchasePriceNis}) => {
    try {
      const result = await createBuyerMutation.mutateAsync({
        buyers: buyers.map((buyer, i) => ({
          ...buyer,
          ...(i === 0 && uploadedDocumentIds.length > 0 ? {documentIds: uploadedDocumentIds} : {})
        })),
        unit,
        purchasePriceNis
      });
      const buyer = result.data[0];
      if (buyer) onSuccess(buyer);
    } catch {
      // Surfaced via saveError
    }
  });

  const handleCancel = () => {
    form.reset(EMPTY_CREATE_BUYER_FORM_VALUES);
    createBuyerMutation.reset();
  };

  const {aiFields, isProcessing, suggestionsCount, markFieldModified, handleCancelWithAI} =
    useFormShell<CreateBuyerFormValues>({
      isDirty: form.formState.isDirty,
      isLoading: false,
      isSaving: createBuyerMutation.isPending,
      isError: false,
      isSaveError: createBuyerMutation.isError,
      onSave: handleSave,
      onCancel: handleCancel,
      ai: {
        entityType: DocumentEntityType.TRUST_ACCOUNT,
        entityId: trustAccountId,
        documentContext: DocumentContext.PURCHASE_DOCUMENTS,
        documentTypes: BUYER_AI_DOCUMENT_TYPES,
        getValues: form.getValues,
        setValue: form.setValue,
        resolveField: (field: string) => field
      }
    });

  return {
    form,
    handleSave,
    handleCancel: handleCancelWithAI,
    saveError: createBuyerMutation.error,
    isSaving: createBuyerMutation.isPending,
    aiFields,
    isProcessing,
    suggestionsCount,
    markFieldModified
  };
};
