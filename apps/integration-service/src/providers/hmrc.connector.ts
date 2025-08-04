import { Injectable } from '@nestjs/common';
import { HMRCProvider } from 'libs/providers/HMRCProvider';
import AWS from 'aws-sdk';
import opossum from 'opossum';

@Injectable()
export class HMRCConnector implements HMRCProvider {
  private apiKey: string;
  private circuit: any;

  constructor() {
    this.apiKey = process.env.HMRC_API_KEY || '';
    this.circuit = new opossum(this._fetch.bind(this), {
      errorThresholdPercentage: 50,
      timeout: 2000,
      resetTimeout: 10000,
    });
  }

  async _fetch(nino: string) {
    // Mock: load from local JSON fixture
    return [
      { year: "2022", income: 23000 },
      { year: "2023", income: 24000 }
    ];
  }

  async getIncomeHistory(nino: string) {
    try {
      return await this.circuit.fire(nino);
    } catch (e) {
      throw new Error('HMRC fetch failed');
    }
  }
}