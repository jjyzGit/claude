import {RouterProvider as ReactRouterProvider} from 'react-router-dom';

import {router} from './routes';

import type {FC} from 'react';

export const RouterProvider: FC = () => {
  return <ReactRouterProvider router={router} />;
};
