import {RealtimeEventType} from '@sollapay/enums';
import {formatNIS, formatDateTimeLocalized} from '@sollapay/utils';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useEventStream} from '@/hooks';

import {showPaymentReceivedToast} from '../components';

import type {RealtimeEvent} from '@sollapay/types';

/**
 * Subscribes to the SSE stream and shows a persistent "payment received" toast
 * whenever a `payment.received` event arrives for the current user.
 *
 * Mount once in MainLayout so the stream is open for the entire authenticated session.
 */
export function usePaymentReceivedToast(): void {
  const navigate = useNavigate();
  const {i18n} = useTranslation();

  useEventStream((event: RealtimeEvent) => {
    if (event.type !== RealtimeEventType.PaymentReceived) return;

    const amount = formatNIS(event.amountNis);
    const dateTime = formatDateTimeLocalized(event.transactionDate, i18n.language);

    showPaymentReceivedToast(event.trustAccountName, event.senderName, amount, dateTime, () =>
      navigate(`/trust-accounts/${event.trustAccountId}/transactions`)
    );
  });
}
