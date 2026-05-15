import {createStorageManager} from '@sollapay/utils';
import {useState} from 'react';

export const appStorage = createStorageManager({prefix: 'sollapay:web'});

export function useStorageManager<T>(
  key: string,
  defaultValue: T,
  validate?: (value: unknown) => value is T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = appStorage.getItem(key);
    if (validate && stored !== null) {
      return validate(stored) ? (stored as T) : defaultValue;
    }

    return stored !== null ? (stored as T) : defaultValue;
  });

  const setStoredValue = (newValue: T): void => {
    setValue(newValue);
    appStorage.setItem(key, String(newValue));
  };

  return [value, setStoredValue];
}
