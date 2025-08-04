import { EligibilityService } from '../src/eligibility/eligibility.service';

describe('EligibilityService', () => {
  let service: EligibilityService;

  beforeAll(async () => {
    service = new EligibilityService();
    await service.onModuleInit();
  });

  it('should evaluate housing benefit rule', () => {
    const result = service.evaluate({ housing: 'rented', income: 'low' });
    expect(result).toEqual([
      { benefitCode: 'HOUSING_BENEFIT', probability: 100 }
    ]);
  });

  it('should return lower score if not all criteria match', () => {
    const result = service.evaluate({ housing: 'rented', income: 'high' });
    expect(result[0].probability).toBeLessThan(100);
  });
});