export enum PollingTier {
  Fast = 'fast', // 5 s — reserved, no current consumers
  Medium = 'medium', // 15 s
  Slow = 'slow', // 30 s
  VerySlow = 'very-slow' // 60 s
}

export const POLLING_INTERVAL_MS: Record<PollingTier, number> = {
  [PollingTier.Fast]: 5_000,
  [PollingTier.Medium]: 15_000,
  [PollingTier.Slow]: 30_000,
  [PollingTier.VerySlow]: 60_000
};

export const pollingInterval = {
  fast: POLLING_INTERVAL_MS[PollingTier.Fast],
  medium: POLLING_INTERVAL_MS[PollingTier.Medium],
  slow: POLLING_INTERVAL_MS[PollingTier.Slow],
  verySlow: POLLING_INTERVAL_MS[PollingTier.VerySlow]
} as const;
