import {DirectionProvider} from '@sollapay/ui/providers';
import {I18nextProvider} from 'react-i18next';

import i18n from '@/lib/i18n/config';

import type {ComponentType} from 'react';

/**
 * Wraps a story with an isolated i18n context and explicit direction.
 * Uses cloned i18n instances so language changes don't bleed across stories
 * when multiple stories are rendered simultaneously (e.g. Storybook Docs page).
 */
const i18nEn = i18n.cloneInstance({lng: 'en'});
const i18nHe = i18n.cloneInstance({lng: 'he'});

export const withEnglish = (Story: ComponentType) => (
  <I18nextProvider i18n={i18nEn}>
    <DirectionProvider direction="ltr">
      <div dir="ltr">
        <Story />
      </div>
    </DirectionProvider>
  </I18nextProvider>
);

export const withHebrew = (Story: ComponentType) => (
  <I18nextProvider i18n={i18nHe}>
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Story />
      </div>
    </DirectionProvider>
  </I18nextProvider>
);
