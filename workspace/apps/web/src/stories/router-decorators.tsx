import {MemoryRouter} from 'react-router-dom';

import type {ComponentType} from 'react';

export const withRouter = (Story: ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);
