import {Button, Icon, toast} from '@sollapay/ui/components';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import type {FC} from 'react';

export interface CopyButtonProps {
  text: string;
  fieldName?: string;
}

export const CopyButton: FC<CopyButtonProps> = ({text, fieldName}) => {
  const {t} = useTranslation('common');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success(fieldName ? t('copiedToClipboard', {fieldName}) : t('copied'));
    } catch {
      // Clipboard API unavailable or permission denied — fail silently
    }
  }, [text, fieldName, t]);

  return (
    <Button
      variant="tertiary"
      size="icon-xs"
      onClick={handleCopy}
      aria-label={copied ? t('copied') : t('copy')}
      icon={
        copied ? (
          <Icon name="check-circle" className="text-indication-success" />
        ) : (
          <Icon name="copy" />
        )
      }
    />
  );
};
