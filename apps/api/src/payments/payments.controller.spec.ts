import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: { getByInvoiceId: jest.fn().mockResolvedValue({ clientSecret: 'abc', }) },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should return payment info', async () => {
    const result = await controller.getPaymentInfo('inv1');
    expect(result).toHaveProperty('clientSecret');
    expect(result).toHaveProperty('publishableKey');
  });
});