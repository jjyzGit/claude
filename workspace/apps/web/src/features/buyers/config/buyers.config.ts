import {InitiationMethod, PaymentInstructionStatus} from '@sollapay/enums';

import type {BuyerPaymentStatus} from '../types/buyers.types';
import type {IconName} from '@sollapay/ui/components';

interface PaymentStatusConfig {
  labelKey: string;
  variant: 'warning' | 'info' | 'success' | 'error';
  icon: IconName;
}

interface InstructionStatusConfig {
  variant: 'success' | 'warning' | 'error' | 'info' | 'gray';
  icon: IconName;
}

interface InitiationMethodConfig {
  icon: IconName;
  labelKey: string;
}

export const INITIATION_METHOD_CONFIG: Record<InitiationMethod, InitiationMethodConfig> = {
  [InitiationMethod.RTP]: {
    icon: 'coins-hand',
    labelKey: 'view.buyers.paymentRequest.methods.rtp'
  },
  [InitiationMethod.PIS]: {
    icon: 'coins-hand',
    labelKey: 'view.buyers.paymentRequest.methods.rtp'
  },
  [InitiationMethod.MANUAL_BRANCH_TRANSFER]: {
    icon: 'bank-branch',
    labelKey: 'view.buyers.paymentRequest.methods.manual_branch_transfer'
  }
};

export const PAYMENT_INSTRUCTION_STATUS_CONFIG: Record<
  PaymentInstructionStatus,
  InstructionStatusConfig
> = {
  [PaymentInstructionStatus.COMPLETED]: {variant: 'success', icon: 'credit-card-check'},
  [PaymentInstructionStatus.PARTIALLY_MATCHED]: {variant: 'warning', icon: 'credit-card-check'},
  [PaymentInstructionStatus.PENDING_EXECUTION]: {variant: 'info', icon: 'credit-card-up'},
  [PaymentInstructionStatus.AWAITING_FUNDS]: {variant: 'info', icon: 'clock'},
  [PaymentInstructionStatus.FAILED]: {variant: 'error', icon: 'alert-circle'},
  [PaymentInstructionStatus.CANCELLED]: {variant: 'error', icon: 'credit-card-cancel'},
  [PaymentInstructionStatus.EXPIRED]: {variant: 'error', icon: 'credit-card-expired'}
};

export const BUYER_PAYMENT_STATUS_CONFIG: Record<BuyerPaymentStatus, PaymentStatusConfig> = {
  no_request: {
    labelKey: 'view.buyers.list.status.noRequest',
    variant: 'warning',
    icon: 'credit-card-edit'
  },
  request_sent: {
    labelKey: 'view.buyers.list.status.requestSent',
    variant: 'info',
    icon: 'credit-card-up'
  },
  partial: {
    labelKey: 'view.buyers.list.status.partial',
    variant: 'warning',
    icon: 'credit-card-check'
  },
  completed: {
    labelKey: 'view.buyers.list.status.completed',
    variant: 'success',
    icon: 'bank-note'
  },
  cancelled: {
    labelKey: 'view.buyers.list.status.cancelled',
    variant: 'error',
    icon: 'credit-card-cancel'
  },
  expired: {
    labelKey: 'view.buyers.list.status.expired',
    variant: 'error',
    icon: 'credit-card-expired'
  }
};
