import {DeveloperType, RelationshipType} from '@sollapay/enums';

import type {TrustDeveloperDetailsDTO} from '@sollapay/types';

export type MetFaceToFaceValue = 'yes' | 'no' | '';

export interface DeveloperDetailsFormValues {
  developerType: DeveloperType | '';
  relationshipType: RelationshipType | '';
  metFaceToFace: MetFaceToFaceValue;
  fullName: string;
  idNumber: string;
  establishedDate: string;
  address: string;
}

export const EMPTY_DEVELOPER_DETAILS_FORM_VALUES: DeveloperDetailsFormValues = {
  developerType: DeveloperType.CORPORATION,
  relationshipType: '',
  metFaceToFace: '',
  fullName: '',
  idNumber: '',
  establishedDate: '',
  address: ''
};

const toMetFaceToFaceValue = (value: boolean | null | undefined): MetFaceToFaceValue => {
  if (value === true) return 'yes';
  if (value === false) return 'no';
  return '';
};

const fromMetFaceToFaceValue = (value: MetFaceToFaceValue): boolean | null => {
  if (value === 'yes') return true;
  if (value === 'no') return false;
  return null;
};

export const toDeveloperDetailsFormValues = (
  developer: TrustDeveloperDetailsDTO | null | undefined
): DeveloperDetailsFormValues => {
  if (!developer) {
    return EMPTY_DEVELOPER_DETAILS_FORM_VALUES;
  }

  return {
    developerType:
      developer.developerType === DeveloperType.CORPORATION ||
      developer.developerType === DeveloperType.INDIVIDUAL
        ? developer.developerType
        : '',
    relationshipType:
      developer.relationshipType === RelationshipType.FIRST_PROJECT ||
      developer.relationshipType === RelationshipType.FEW_PROJECTS ||
      developer.relationshipType === RelationshipType.ONGOING_COLLAB
        ? developer.relationshipType
        : '',
    metFaceToFace: toMetFaceToFaceValue(developer.metFaceToFace),
    fullName: developer.fullName ?? '',
    idNumber: developer.idNumber ?? '',
    establishedDate: developer.establishedDate ?? '',
    address: developer.address ?? ''
  };
};

export const toTrustDeveloperDetailsDTO = (
  values: DeveloperDetailsFormValues
): TrustDeveloperDetailsDTO => ({
  developerType: values.developerType || null,
  relationshipType: values.relationshipType || null,
  metFaceToFace: fromMetFaceToFaceValue(values.metFaceToFace),
  fullName: values.fullName.trim(),
  idNumber: values.idNumber.trim(),
  establishedDate: values.establishedDate.trim() || null,
  address: values.address.trim()
});
