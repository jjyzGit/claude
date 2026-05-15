/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG: string;
  readonly VITE_API_URL: string;
  readonly VITE_OPS_API_URL: string;
  readonly VITE_BANK_SIMULATOR_URL: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_CLAIMS_NAMESPACE: string;
  /** Allow users to enter a custom NIS amount when initiating payment. Default: false (fixed 7%). */
  readonly VITE_ALLOW_CUSTOM_PAYMENT_AMOUNT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
