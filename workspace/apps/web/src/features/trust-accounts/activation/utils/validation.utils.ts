import type {ZodError} from 'zod';

export const flattenFieldErrors = (
  error: ZodError | null | undefined
): Record<string, string | undefined> => {
  if (!error) return {};
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([k, v]) => [
      k,
      (v as string[] | undefined)?.[0]
    ])
  );
};
