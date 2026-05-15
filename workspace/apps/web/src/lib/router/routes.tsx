import {Navigate, createBrowserRouter} from 'react-router-dom';

import {MainLayout} from '@/layouts';
import {
  BuyerDetailPage,
  DilutionCalculatorPage,
  TrustAccountActivationPage,
  TrustAccountListPage,
  TrustAccountViewPage
} from '@/pages';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/trust-accounts" replace />
      },
      {
        path: '/trust-accounts',
        element: <TrustAccountListPage />
      },
      {
        path: '/trust-accounts/:id/activation',
        element: <TrustAccountActivationPage />
      },
      {
        path: '/trust-accounts/:id/buyers/:buyerId',
        element: <BuyerDetailPage />
      },
      {
        path: '/trust-accounts/:id/:tab?',
        element: <TrustAccountViewPage />
      },
      {
        path: '/dilution-calculator',
        element: <DilutionCalculatorPage />
      },
      {
        path: '*',
        element: <Navigate to="/trust-accounts" replace />
      }
    ]
  }
]);
