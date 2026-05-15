import {useStorageManager} from './useStorageManager';

import type {ListView} from '@sollapay/ui/components';

function isListView(value: unknown): value is ListView {
  return value === 'table' || value === 'card';
}

export function useListViewPreference(storageKey: string, defaultView: ListView = 'table') {
  const [view, setView] = useStorageManager(storageKey, defaultView, isListView);
  return {view, setPreferredView: setView};
}
