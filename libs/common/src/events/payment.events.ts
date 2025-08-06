export interface PaymentIntentCreatedEvent {
  paymentId: string;
  invoiceId: string;
  clientSecret: string;
  provider: string;
  createdAt: string;
}

export interface PaymentSucceededEvent {
  paymentId: string;
  invoiceId: string;
  provider: string;
  succeededAt: string;
}