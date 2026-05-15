import {
  DocumentStatus,
  DocumentType,
  InitiationMethod,
  PaymentInstructionStatus,
  PartyRole,
  UnitAttachmentType
} from '@sollapay/enums';

import type {BuyerTableRow} from '../types/buyers.types';
import type {
  BuyerDTO,
  BuyerPurchaseWithDocumentsDTO,
  BuyerWithDocumentsDTO,
  PaymentInstructionDTO
} from '@sollapay/types';

export const MOCK_PURCHASE_ID = 'purchase-1';
export const MOCK_PURCHASE_ID_2 = 'purchase-2';
export const MOCK_TRUST_ACCOUNT_ID = 'trust-account-1';

export const mockPurchase: BuyerPurchaseWithDocumentsDTO = {
  id: MOCK_PURCHASE_ID,
  unit: {
    id: 'unit-1',

    buildingNumber: '1',
    unitNumber: '121',
    attachments: [{id: 'att-1', type: UnitAttachmentType.Parking, description: 'P-12'}]
  },
  purchasePriceNis: '1000000',
  regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false},
  documents: [
    {
      id: 'doc-1',
      fileName: 'contract-signed.pdf',
      originalFileName: 'הסכם מכר - חתום.pdf',
      fileSize: 2500000,
      mimeType: 'application/pdf',
      documentType: DocumentType.TRANSACTION_LEGAL_DOCUMENT,
      status: DocumentStatus.UPLOADED,
      uploadedByUserId: 'user-1',
      uploadedAt: new Date('2023-09-01'),
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2023-09-01')
    },
    {
      id: 'doc-2',
      fileName: 'payment-schedule.pdf',
      originalFileName: 'נספח תשלומים.pdf',
      fileSize: 1100000,
      mimeType: 'application/pdf',
      documentType: DocumentType.TRANSACTION_LEGAL_DOCUMENT,
      status: DocumentStatus.UPLOADED,
      uploadedByUserId: 'user-1',
      uploadedAt: new Date('2023-08-15'),
      createdAt: new Date('2023-08-15'),
      updatedAt: new Date('2023-08-15')
    }
  ]
};

export const mockPurchase2: BuyerPurchaseWithDocumentsDTO = {
  id: MOCK_PURCHASE_ID_2,
  unit: {
    id: 'unit-2',

    buildingNumber: '2',
    unitNumber: '99',
    attachments: []
  },
  purchasePriceNis: '800000',
  regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false},
  documents: []
};

export const mockBuyer: BuyerWithDocumentsDTO = {
  id: 'buyer-1',
  fullName: 'שרה כהן',
  nationalId: '012345674',
  dateOfBirth: '1985-05-14',
  gender: 'female',
  phone: '+972541234567',
  email: 'sarah@example.com',
  address: 'הרצל 45, תל אביב',
  roles: [PartyRole.BUYER],
  purchases: [mockPurchase],
  createdAt: new Date('2023-09-01').toISOString()
};

export const mockBuyerMultiUnit: BuyerWithDocumentsDTO = {
  ...mockBuyer,
  purchases: [mockPurchase, mockPurchase2]
};

export const mockBuyerDTO: BuyerDTO = {
  ...mockBuyer,
  purchases: [
    {
      id: MOCK_PURCHASE_ID,
      unit: {
        id: 'unit-1',

        buildingNumber: '1',
        unitNumber: '121',
        attachments: []
      },
      purchasePriceNis: '1000000',
      regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false}
    }
  ]
};

export const mockPaymentCompleted: PaymentInstructionDTO = {
  id: 'payment-1',
  trustBuyerPurchaseId: MOCK_PURCHASE_ID,
  trustAccountId: MOCK_TRUST_ACCOUNT_ID,
  amountNis: '30000',
  allocatedAmountNis: '30000',
  percent: '3',
  initiationMethod: InitiationMethod.MANUAL_BRANCH_TRANSFER,
  referenceCode: 'REF-8493',
  status: PaymentInstructionStatus.COMPLETED,
  createdByUserId: 'user-1',
  buyerPartyId: null,
  createdAt: new Date('2023-09-12').toISOString(),
  updatedAt: new Date('2023-09-12').toISOString()
};

export const mockPaymentPending: PaymentInstructionDTO = {
  id: 'payment-2',
  trustBuyerPurchaseId: MOCK_PURCHASE_ID,
  trustAccountId: MOCK_TRUST_ACCOUNT_ID,
  amountNis: '30000',
  allocatedAmountNis: '0',
  percent: '3',
  initiationMethod: InitiationMethod.RTP,
  referenceCode: 'REF-9102',
  status: PaymentInstructionStatus.PENDING_EXECUTION,
  createdByUserId: 'user-1',
  buyerPartyId: null,
  createdAt: new Date('2023-10-01').toISOString(),
  updatedAt: new Date('2023-10-01').toISOString()
};

export const mockTableRow: BuyerTableRow = {
  buyers: [mockBuyerDTO],
  purchase: {
    id: MOCK_PURCHASE_ID,
    unit: {
      id: 'unit-1',

      buildingNumber: '1',
      unitNumber: '121',
      attachments: []
    },
    purchasePriceNis: '1000000',
    regulatoryReports: {realEstateTaxation: false, salesLawCommissioner: false}
  },
  amountToPayNis: '70000',
  depositPaidNis: '30000',
  paymentStatus: 'completed'
};

export const mockTableRowNoRequest: BuyerTableRow = {
  ...mockTableRow,
  depositPaidNis: '0',
  paymentStatus: 'no_request'
};

export const mockTableRowSent: BuyerTableRow = {
  ...mockTableRow,
  depositPaidNis: '0',
  paymentStatus: 'request_sent'
};
