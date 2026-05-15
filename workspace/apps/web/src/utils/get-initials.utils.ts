export const getInitials = (name: string | null | undefined): string => {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map(w => (w[0] ?? '').toUpperCase())
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .join('');
};
