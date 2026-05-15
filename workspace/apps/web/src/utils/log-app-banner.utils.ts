declare const __APP_NAME__: string;
declare const __APP_VERSION__: string;

export function logAppBanner() {
  // eslint-disable-next-line no-console
  console.log(
    '%c %s  v%s ',
    'background:#18193F;color:#F5C842;font-size:18px;font-weight:bold;padding:6px 12px;border-radius:6px;letter-spacing:1px;',
    __APP_NAME__,
    __APP_VERSION__
  );
}
