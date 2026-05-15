import {useEffect, useMemo} from 'react';

import {INITIAL_FORM_STATE} from '@/hooks';

import {useDocumentsQuery} from './useDocuments';

import type {FormStateSnapshot} from '@/hooks';
import type {DocumentContext, DocumentEntityType, DocumentType} from '@sollapay/enums';

interface UseDocumentRequiredFormParams {
  entityType: DocumentEntityType;
  entityId: string;
  documentContext: DocumentContext;
  requiredDocumentType: DocumentType;
  onFormStateChange?: (state: FormStateSnapshot) => void;
}

/**
 * Tracks whether a required document has been uploaded and reports the
 * result via `onFormStateChange`. Use this for steps that have no form
 * fields — only a mandatory document upload.
 */
export const useDocumentRequiredForm = ({
  entityType,
  entityId,
  documentContext,
  requiredDocumentType,
  onFormStateChange
}: UseDocumentRequiredFormParams) => {
  const documentsQuery = useDocumentsQuery(entityType, entityId, documentContext);

  const hasRequiredDocument = useMemo(
    () => (documentsQuery.data ?? []).some(doc => doc.documentType === requiredDocumentType),
    [documentsQuery.data, requiredDocumentType]
  );

  // Don't report the query's loading/error state to the modal — document
  // fetching is silent and should never hide form content or show a spinner.
  // Suppress the error indicator while the initial check is still in flight.
  const hasErrors = !documentsQuery.isLoading && !hasRequiredDocument;

  useEffect(() => {
    onFormStateChange?.({...INITIAL_FORM_STATE, hasErrors});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasErrors]);

  return {hasErrors, isLoading: documentsQuery.isLoading};
};
