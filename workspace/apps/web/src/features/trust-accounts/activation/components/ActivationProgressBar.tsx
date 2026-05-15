import {PackageStatus} from '@sollapay/enums';
import {useEffect, useState} from 'react';

import {useDirection} from '@/lib/i18n/hooks';

import {ACTIVATION_PACKAGE_CONFIG} from '../config';

import type {PackageType} from '@sollapay/enums';
import type {PackageReadiness} from '@sollapay/types';
import type {FC} from 'react';

interface ActivationProgressBarProps {
  packages: Array<{type: PackageType; status: PackageStatus; readiness: PackageReadiness}>;
  className?: string;
}

const MIN_PROGRESS_PERCENT = 10;
const READINESS_STAGE_PERCENT = 20;
const SUBMISSION_STAGE_PERCENT = 30;
const APPROVAL_STAGE_PERCENT = 40;

export const ActivationProgressBar: FC<ActivationProgressBarProps> = ({
  packages,
  className = ''
}) => {
  const direction = useDirection();
  const progressPercent = computeProgressPercent(packages);
  const [animatedProgressPercent, setAnimatedProgressPercent] = useState(0);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setAnimatedProgressPercent(progressPercent);
    });

    return () => cancelAnimationFrame(frameId);
  }, [progressPercent]);

  const isRtl = direction === 'rtl';

  return (
    <div className={`absolute inset-x-0 top-0 h-0.5 bg-background-tertiary ${className}`}>
      <div
        className="absolute inset-y-0 w-full bg-brand-primary transition-all duration-500"
        style={{
          width: `${animatedProgressPercent}%`,
          ...(isRtl ? {right: 0} : {left: 0})
        }}
      />
    </div>
  );
};

function isSubmitted(status: PackageStatus): boolean {
  return (
    status === PackageStatus.SUBMITTED ||
    status === PackageStatus.IN_REVIEW ||
    status === PackageStatus.CLARIFICATION_REQUIRED ||
    status === PackageStatus.APPROVED
  );
}

function computeProgressPercent(
  packages: Array<{type: PackageType; status: PackageStatus; readiness: PackageReadiness}>
): number {
  const requiredPackages = packages.filter(p => !ACTIVATION_PACKAGE_CONFIG[p.type].isOptional);
  if (requiredPackages.length === 0) return MIN_PROGRESS_PERCENT;

  const total = requiredPackages.length;

  // Packages that are ready to submit OR already in the submission workflow
  const readyOrSubmittedCount = requiredPackages.filter(
    p => p.readiness.isReady || isSubmitted(p.status)
  ).length;

  const submittedCount = requiredPackages.filter(p => isSubmitted(p.status)).length;
  const approvedCount = requiredPackages.filter(p => p.status === PackageStatus.APPROVED).length;

  const progress =
    MIN_PROGRESS_PERCENT +
    (readyOrSubmittedCount / total) * READINESS_STAGE_PERCENT +
    (submittedCount / total) * SUBMISSION_STAGE_PERCENT +
    (approvedCount / total) * APPROVAL_STAGE_PERCENT;

  return Math.min(100, Math.round(progress));
}
