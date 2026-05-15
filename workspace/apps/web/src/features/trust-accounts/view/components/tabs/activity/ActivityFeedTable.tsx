import {Table, Typography, nodeColumn} from '@sollapay/ui/components';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {ActivityFeedRow} from './ActivityFeedRow';

import type {TrustAccountActivityDTO} from '@sollapay/types';

interface ActivityFeedTableProps {
  activities: TrustAccountActivityDTO[];
  loadedCount: number;
  total: number;
}

export function ActivityFeedTable({activities, loadedCount, total}: ActivityFeedTableProps) {
  const {t, i18n} = useTranslation('trustAccounts');

  const countLabel = t('view.activity.countLabel', {loaded: loadedCount, total});

  const columns = useMemo(
    () => [
      nodeColumn<TrustAccountActivityDTO>({
        id: 'activity',
        header: (
          <div className="flex items-baseline gap-2">
            <Typography size="sm" color="secondary">
              {t('view.activity.title')}
            </Typography>
            <Typography size="xs" color="tertiary">
              {countLabel}
            </Typography>
          </div>
        ),
        className: '-mx-6 -my-4',
        cell: row => <ActivityFeedRow activity={row} />,
        enableSorting: false
      })
    ],
    [t, i18n.language, countLabel]
  );

  return <Table columns={columns} data={activities} />;
}
