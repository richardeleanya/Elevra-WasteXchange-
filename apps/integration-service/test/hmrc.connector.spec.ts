import { HMRCConnector } from '../src/providers/hmrc.connector';

describe('HMRCConnector', () => {
  it('returns mock income history', async () => {
    const c = new HMRCConnector();
    const result = await c.getIncomeHistory('AB123456C');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('year');
  });
});