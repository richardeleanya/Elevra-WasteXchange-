export enum EmailType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  APPLICATION_APPROVED = 'APPLICATION_APPROVED',
  INVOICE_CREATED = 'INVOICE_CREATED',
  PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
}

export interface NotificationRequestedEvent {
  userId: string;
  type: EmailType;
  params: Record<string, any>;
}