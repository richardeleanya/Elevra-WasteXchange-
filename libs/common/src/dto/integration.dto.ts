export enum IntegrationProviderType {
  HMRC = "HMRC",
  DWP = "DWP",
  OPEN_BANKING = "OPEN_BANKING",
  EXPERIAN = "EXPERIAN"
}

export interface IntegrationRequestEvent {
  userId: string;
  provider: IntegrationProviderType;
  payload: Record<string, any>;
  requestId: string;
}

export interface IntegrationResultEvent {
  userId: string;
  provider: IntegrationProviderType;
  payload: Record<string, any>;
  requestId: string;
  status: 'SUCCESS' | 'ERROR';
  receivedAt: string;
}