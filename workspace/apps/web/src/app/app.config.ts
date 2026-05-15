const env = import.meta.env;

export const config = {
  debug: env.VITE_DEBUG === 'true',
  apiUrl: env.VITE_API_URL,
  auth0: {
    domain: env.VITE_AUTH0_DOMAIN,
    clientId: env.VITE_AUTH0_CLIENT_ID,
    audience: env.VITE_AUTH0_AUDIENCE,
    claimsNamespace: env.VITE_AUTH0_CLAIMS_NAMESPACE
  },
  features: {
    /** When true, users can enter a custom NIS amount when initiating payment (instead of fixed 7%) */
    allowCustomPaymentAmount: env.VITE_ALLOW_CUSTOM_PAYMENT_AMOUNT === 'true'
  }
} as const;
