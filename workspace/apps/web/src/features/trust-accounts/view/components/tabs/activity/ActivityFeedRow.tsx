import {TrustAccountActivityType} from '@sollapay/enums';

import {
  BuyerAddedRow,
  BuyerDepositRow,
  BuyerRemovedRow,
  BuyerWithdrawalRow,
  DocumentRow
} from './rows';

import type {TrustAccountActivityDTO} from '@sollapay/types';

interface ActivityFeedRowProps {
  activity: TrustAccountActivityDTO;
}

export function ActivityFeedRow({activity}: ActivityFeedRowProps) {
  switch (activity.activityType) {
    case TrustAccountActivityType.BUYER_DEPOSIT:
      return <BuyerDepositRow activity={activity} />;
    case TrustAccountActivityType.BUYER_WITHDRAWAL:
      return <BuyerWithdrawalRow activity={activity} />;
    case TrustAccountActivityType.BUYER_ADDED:
      return <BuyerAddedRow activity={activity} />;
    case TrustAccountActivityType.BUYER_REMOVED:
      return <BuyerRemovedRow activity={activity} />;
    case TrustAccountActivityType.DOCUMENT_ADDED:
    case TrustAccountActivityType.DOCUMENT_UPDATED:
    case TrustAccountActivityType.DOCUMENT_REMOVED:
      return <DocumentRow activity={activity} />;
    default:
      return null;
  }
}
