import {Badge, Icon, Spinner} from '@sollapay/ui/components';
import {Trans, useTranslation} from 'react-i18next';

import type {FC} from 'react';

export interface AiExtractionStatusProps {
  /** True while at least one document is still being processed. */
  isProcessing: boolean;
  /** Number of AI suggestions currently visible in the form. */
  suggestionsCount: number;
}

/**
 * Inline AI extraction status badge.
 *
 * - Hidden when not processing AND no suggestions.
 * - Shows a spinner badge while extraction is running.
 * - Transitions to a green success badge once suggestions are ready.
 *
 * Designed to sit inline with a FormSectionHeading in a flex row.
 */
export const AiExtractionStatus: FC<AiExtractionStatusProps> = ({
  isProcessing,
  suggestionsCount
}) => {
  const {t} = useTranslation('common');

  if (!isProcessing && suggestionsCount === 0) return null;

  return (
    <div className="flex items-center" aria-live="polite" aria-atomic="true">
      {isProcessing ? (
        <Badge
          key="processing"
          variant="info"
          size="sm"
          className="animate-in fade-in slide-in-from-right-2 gap-1.5 duration-300"
        >
          <Spinner className="size-3.5 shrink-0" />
          {t('aiExtraction.generating')}
        </Badge>
      ) : (
        <Badge
          key="completed"
          variant="success"
          size="sm"
          className="animate-in fade-in slide-in-from-right-2 gap-1.5 duration-300"
        >
          <Icon name="check-circle" className="size-3.5 shrink-0" />
          <Trans
            ns="common"
            i18nKey="aiExtraction.suggestionsFound"
            values={{count: suggestionsCount}}
            components={{bold: <strong />}}
          />
        </Badge>
      )}
    </div>
  );
};
