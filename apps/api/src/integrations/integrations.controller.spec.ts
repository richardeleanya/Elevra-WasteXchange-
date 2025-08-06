import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

describe('IntegrationsController', () => {
  let controller: IntegrationsController;
  let service: IntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsController],
      providers: [
        {
          provide: IntegrationsService,
          useValue: { getLogs: jest.fn().mockResolvedValue([{ id: '1', provider: 'HMRC' }]) }
        }
      ]
    }).compile();

    controller = module.get<IntegrationsController>(IntegrationsController);
    service = module.get<IntegrationsService>(IntegrationsService);
  });

  it('should return integration logs', async () => {
    const logs = await controller.getLogs();
    expect(Array.isArray(logs)).toBe(true);
    expect(logs[0]).toHaveProperty('provider');
  });
});