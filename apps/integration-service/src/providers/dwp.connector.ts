import { Injectable } from '@nestjs/common';
import { DWPProvider } from 'libs/providers/DWPProvider';
import AWS from 'aws-sdk';
import opossum from 'opossum';

@Injectable()
export class DWPConnector implements DWPProvider {
  private apiKey: string;
  private circuit: any;

  constructor() {
    this.apiKey = process.env.DWP_API_KEY || '';
    this.circuit = new opossum(this._fetch.bind(this), {
      errorThresholdPercentage: 50,
      timeout: 2000,
      resetTimeout: 10000,
    });
  }

  async _fetch(nino: string) {
    // Mock: load from local JSON fixture
    return { status: "active", lastPaymentDate: "2024-06-01" };
  }

  async getUniversalCreditStatus(nino: string) {
    try {
      return await this.circuit.fire(nino);
    } catch (e) {
      throw new Error('DWP fetch failed');
    }
  }
}