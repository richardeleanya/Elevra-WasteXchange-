import { Injectable } from '@nestjs/common';
import opossum from 'opossum';

@Injectable()
export class OpenBankingConnector {
  private clientId: string;
  private clientSecret: string;
  private circuit: any;

  constructor() {
    this.clientId = process.env.TRUELAYER_CLIENT_ID || '';
    this.clientSecret = process.env.TRUELAYER_CLIENT_SECRET || '';
    this.circuit = new opossum(this._fetch.bind(this), {
      errorThresholdPercentage: 50,
      timeout: 2000,
      resetTimeout: 10000,
    });
  }

  async _fetch(userId: string) {
    // Mock: Return sandbox TrueLayer-like data
    return { monthlyIncome: 2400, verified: true };
  }

  async getIncomeVerification(userId: string) {
    try {
      return await this.circuit.fire(userId);
    } catch (e) {
      throw new Error('OpenBanking fetch failed');
    }
  }
}