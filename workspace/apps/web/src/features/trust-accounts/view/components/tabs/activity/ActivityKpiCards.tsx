import {formatNIS} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';

import {KpiCard} from './KpiCard';

import type {ChangeMetrics, TrustAccountStatsDTO} from '@sollapay/types';

function changeProps(
  change: ChangeMetrics | null,
  noChangeLabel: string
): {
  change: string | null;
  direction?: 'increase' | 'decrease';
  noChangeLabel?: string;
} {
  if (!change) {
    return {change: null};
  }
  if (change.direction === 'no_change') {
    return {change: null, noChangeLabel};
  }
  return {change: change.displayValue, direction: change.direction};
}

interface ActivityKpiCardsProps {
  stats: TrustAccountStatsDTO;
}

export function ActivityKpiCards({stats}: ActivityKpiCardsProps) {
  const {t, i18n} = useTranslation('trustAccounts');
  const noChange = t('view.activity.kpi.noChangeFromLastWeek');
  const changeLabel = t('view.activity.kpi.changeFromLastWeek');

  return (
    <div className="grid grid-cols-4 gap-6">
      <KpiCard
        icon="wallet"
        label={t('view.activity.kpi.totalBalance')}
        value={formatNIS(stats.totalBalance.amountNis)}
        changeLabel={changeLabel}
        {...changeProps(stats.totalBalance.change, noChange)}
      />
      <KpiCard
        icon="credit-card-up"
        label={t('view.activity.kpi.depositsThisWeek')}
        value={formatNIS(stats.depositsThisWeek.amountNis)}
        changeLabel={changeLabel}
        {...changeProps(stats.depositsThisWeek.change, noChange)}
      />
      <KpiCard
        icon="users"
        label={t('view.activity.kpi.activeBuyers')}
        value={stats.activeBuyers.count.toLocaleString(i18n.language)}
        change={stats.activeBuyers.withFundsCount.toLocaleString(i18n.language)}
        changeLabel={t('view.activity.kpi.withFundsInTrust')}
        isPositive={true}
      />
      <KpiCard
        icon="credit-card-refresh"
        label={t('view.activity.kpi.transactions')}
        value={stats.transactions.count.toLocaleString(i18n.language)}
        changeLabel={changeLabel}
        {...changeProps(stats.transactions.change, noChange)}
      />
    </div>
  );
}
