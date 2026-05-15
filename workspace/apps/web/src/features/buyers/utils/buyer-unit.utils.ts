import type {TFunction} from 'i18next';

const BUILDING_KEY = 'view.buyers.detail.unitCard.building';
const UNIT_KEY = 'view.buyers.detail.unitCard.unit';

export function formatUnitLabel(
  unit: {buildingNumber: string; unitNumber: string},
  t: TFunction
): string {
  return `${t(BUILDING_KEY)} ${unit.buildingNumber} · ${t(UNIT_KEY)} ${unit.unitNumber}`;
}
