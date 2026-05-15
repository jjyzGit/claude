import type {TrustAccountActivityDTO} from '@sollapay/types';

export function castMetadata<T>(activity: TrustAccountActivityDTO): T | null {
  return activity.metadata as T | null;
}
