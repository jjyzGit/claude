import {Typography} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

import {ErrorAlertMessage} from './ErrorAlertMessage';

import type {FC, FormEventHandler, ReactNode} from 'react';

export interface FormShellProps {
  id: string;
  className?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  saveError?: unknown;
  showRequiredLegend?: boolean;
  children: ReactNode;
}

/**
 * Thin form wrapper that standardises the <form> element and error display.
 * Pair with useFormShell for AI extraction wiring and form-state sync.
 */
export const FormShell: FC<FormShellProps> = ({
  id,
  className,
  onSubmit,
  saveError,
  showRequiredLegend,
  children
}) => {
  const {t} = useTranslation('common');

  return (
    <form id={id} className={className} onSubmit={onSubmit} data-slot={id}>
      {showRequiredLegend && (
        <Typography size="xs" color="tertiary" data-slot="required-legend">
          {t('requiredFieldsNote')}
        </Typography>
      )}
      {saveError != null && <ErrorAlertMessage error={saveError} />}
      {children}
    </form>
  );
};
