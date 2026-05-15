import {useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';

const UNIT_PARAM = 'unit';

interface UseBuyerUnitParamResult {
  selectedIndex: number;
  setSelectedUnit: (index: number) => void;
}

/**
 * Syncs the selected purchase unit tab with a `?unit=<unitId>` query param.
 * Falls back to index 0 if the param is absent or doesn't match any unit.
 */
export function useBuyerUnitParam(unitIds: string[]): UseBuyerUnitParamResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const unitParam = searchParams.get(UNIT_PARAM);
  const selectedIndex = Math.max(
    unitIds.findIndex(u => u === unitParam),
    0
  );

  const setSelectedUnit = useCallback(
    (index: number) => {
      const unit = unitIds[index];
      if (!unit) return;
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          next.set(UNIT_PARAM, unit);
          return next;
        },
        {replace: true}
      );
    },
    [unitIds, setSearchParams]
  );

  return {selectedIndex, setSelectedUnit};
}
