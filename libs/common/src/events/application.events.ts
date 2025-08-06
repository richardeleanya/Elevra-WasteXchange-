export interface ApplicationSubmittedEvent {
  applicationId: string;
  userId: string;
  benefitId: string;
  submittedAt: string;
}

export interface ApplicationApprovedEvent {
  applicationId: string;
  userId: string;
  benefitId: string;
  approvedAt: string;
  annualAmount: number;
}

export interface InvoiceCreatedEvent {
  invoiceId: string;
  applicationId: string;
  userId: string;
  createdAt: string;
  amount: number;
}