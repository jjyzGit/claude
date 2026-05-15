import type {FC} from 'react';

export const AppLogomark: FC = () => (
  <div className="flex size-8 shrink-0 items-center justify-center rounded bg-brand-primary text-xs font-bold text-white">
    SP
  </div>
);

export const AppLogo: FC = () => (
  <div className="flex items-center gap-2">
    <AppLogomark />
    <span className="font-semibold text-fg">Sollapay</span>
  </div>
);
