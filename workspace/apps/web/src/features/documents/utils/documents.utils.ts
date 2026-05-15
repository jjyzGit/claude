import type {DocumentType} from '@sollapay/enums';
import type {DocumentDto} from '@sollapay/types';
import type {TFunction} from 'i18next';

/**
 * Returns the translated label for a document type.
 * Always use this instead of calling t('common:documentTypes.X') directly,
 * so all document type labels (upload tabs, badges, tables) stay in sync.
 */
export function getDocumentTypeLabel(type: DocumentType, t: TFunction): string {
  return t(`common:documentTypes.${type}`);
}

/**
 * Opens a document URL in a new tab using a blob URL for cross-browser compatibility.
 * Revokes the blob URL after 60 seconds to free memory.
 * Throws an error if the document cannot be fetched (e.g. NoSuchKey from S3).
 */
export async function openDocumentPreview(url: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
  }
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank', 'noopener');
  setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
}

/**
 * Returns the most recently uploaded document of a given type, or undefined.
 */
export function getLatestDocument(
  documents: DocumentDto[] | undefined,
  documentType: DocumentType
): DocumentDto | undefined {
  return documents
    ?.filter(d => d.documentType === documentType)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .at(0);
}
