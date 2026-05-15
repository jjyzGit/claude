import {Button, Icon} from '@sollapay/ui/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {UploadDocumentsModal} from './UploadDocumentsModal';

import type {UploadDocumentsModalProps} from './UploadDocumentsModal';

export type AddDocumentsButtonProps = Omit<UploadDocumentsModalProps, 'isOpen' | 'onClose'>;

export function AddDocumentsButton(props: AddDocumentsButtonProps) {
  const {t} = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(true)}>
        <Icon name="add" width={16} height={16} />
        {t('addDocuments')}
      </Button>
      <UploadDocumentsModal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />
    </>
  );
}
