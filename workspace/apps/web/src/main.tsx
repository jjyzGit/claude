import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './app/App';
import './index.css';
import {Providers} from './app/Providers';
import {logAppBanner} from './utils/log-app-banner.utils';

logAppBanner();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
