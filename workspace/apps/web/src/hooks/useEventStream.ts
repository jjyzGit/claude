import {useAuth0} from '@auth0/auth0-react';
import {RealtimeEventType} from '@sollapay/enums';
import {useEffect, useRef} from 'react';

import {config} from '@/app';

import type {RealtimeEvent} from '@sollapay/types';

/**
 * Opens a persistent SSE connection to `GET /v1/api/events/stream` and calls
 * `handler` for every incoming event.
 *
 * Uses native `EventSource` with the JWT passed via `?access_token=` query param
 * (the `tokenFromQuery` middleware on the server copies it to the Authorization header).
 *
 * Reconnects automatically after 5 s on error; `getAccessTokenSilently` is
 * re-invoked on each reconnect so a freshly-expired token is renewed silently.
 */
export function useEventStream(handler: (event: RealtimeEvent) => void): void {
  const {getAccessTokenSilently} = useAuth0();
  // Keep the handler in a ref so reconnects always call the latest closure.
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    let es: EventSource | null = null;
    let cancelled = false;
    let retryTimeoutId: ReturnType<typeof setTimeout> | null = null;

    async function connect(): Promise<void> {
      try {
        const token = await getAccessTokenSilently();
        if (cancelled) return;

        const url = `${config.apiUrl}/v1/api/events/stream?access_token=${encodeURIComponent(token)}`;
        es = new EventSource(url);

        es.addEventListener(RealtimeEventType.PaymentReceived, e => {
          try {
            const data = JSON.parse((e as MessageEvent).data) as RealtimeEvent;
            handlerRef.current(data);
          } catch {
            // Ignore malformed event payloads
          }
        });

        es.onerror = () => {
          es?.close();
          es = null;
          if (!cancelled) {
            retryTimeoutId = setTimeout(() => {
              if (!cancelled) void connect();
            }, 5_000);
          }
        };
      } catch {
        // getAccessTokenSilently failed — retry after delay
        if (!cancelled) {
          retryTimeoutId = setTimeout(() => {
            if (!cancelled) void connect();
          }, 5_000);
        }
      }
    }

    void connect();

    return () => {
      cancelled = true;
      if (retryTimeoutId !== null) clearTimeout(retryTimeoutId);
      es?.close();
    };
  }, [getAccessTokenSilently]);
}
