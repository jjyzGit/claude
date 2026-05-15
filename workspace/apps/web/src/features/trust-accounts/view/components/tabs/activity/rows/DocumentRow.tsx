import {DocumentEntityType, TrustAccountActivityType} from '@sollapay/enums';
import {useTranslation} from 'react-i18next';

import {DocumentActionsBar} from '@/features/documents/components';

import {ActivityFeedRowLayout} from '../ActivityFeedRowLayout';
import {castMetadata} from './metadata.utils';

import type {DocumentContext} from '@sollapay/enums';
import type {DocumentActivityMetadata, TrustAccountActivityDTO} from '@sollapay/types';

interface DocumentRowProps {
  activity: TrustAccountActivityDTO;
}

export function DocumentRow({activity}: DocumentRowProps) {
  const {t} = useTranslation('trustAccounts');
  const meta = castMetadata<DocumentActivityMetadata>(activity);

  const documentContext = meta?.documentContext as DocumentContext | undefined;
  const isRemoved = activity.activityType === TrustAccountActivityType.DOCUMENT_REMOVED;

  return (
    <ActivityFeedRowLayout
      icon="sollapay:document"
      title={t(`view.activity.activityType.${activity.activityType}`)}
      subtitle={meta?.fileName ?? null}
      createdAt={activity.createdAt}
      action={
        !isRemoved && activity.entityId && documentContext ? (
          <DocumentActionsBar
            documentId={activity.entityId}
            entityType={DocumentEntityType.TRUST_ACCOUNT}
            entityId={activity.trustAccountId}
            documentContext={documentContext}
          />
        ) : undefined
      }
    />
  );
}
