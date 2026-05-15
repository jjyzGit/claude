import {useStorageManager} from '@/hooks';

type SidebarMode = 'expanded' | 'collapsed';

const SIDEBAR_MODE_STORAGE_KEY = 'sidebar:mode';

function isSidebarMode(value: unknown): value is SidebarMode {
  return value === 'expanded' || value === 'collapsed';
}

export function useSidebarModePreference(defaultMode: SidebarMode = 'expanded') {
  const [mode, setMode] = useStorageManager(SIDEBAR_MODE_STORAGE_KEY, defaultMode, isSidebarMode);

  return {
    mode,
    setPreferredMode: setMode
  };
}

export type {SidebarMode};
