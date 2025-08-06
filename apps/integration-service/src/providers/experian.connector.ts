import { Injectable } from '@nestjs/common';
import opossum from 'opossum';

@Injectable()
export class ExperianConnector {
  private apiKey: string;
  private circuit: any;

  constructor() {
    this.apiKey = process.env.EXPERIAN_API_KEY || '';
    this.circuit = new opossum(this._fetch.bind(this), {
      errorThresholdPercentage: 50,
      timeout: 2000,
      resetTimeout: 10000,
    });
  }

  async _fetch(userId: string) {
    // Mock sandbox credit check
    return { score: 720, risk: "low" };
  }

  async getCreditCheck(userId: string) {
    try {
      return await this.circuit.fire(userId);
    } catch (e) {
      throw new Error('Experian fetch failed');
    }
  }
}