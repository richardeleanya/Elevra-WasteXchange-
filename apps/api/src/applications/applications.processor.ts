import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ApplicationsService } from './applications.service';
import { ApplicationStatus } from '../entities/application.entity';
import { InvoicesService } from '../invoices/invoices.service';

@Processor('applications')
export class ApplicationsProcessor {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly invoicesService: InvoicesService
  ) {}

  @Process('submitApplication')
  async handleSubmit(job: Job<{ applicationId: string }>) {
    const { applicationId } = job.data;

    // Simulate delay (5-15s)
    await new Promise((res) =>
      setTimeout(res, 5000 + Math.floor(Math.random() * 10000))
    );

    // Update to SUBMITTED
    await this.applicationsService.updateStatus(applicationId, ApplicationStatus.SUBMITTED);

    // Simulate approval after another delay
    await new Promise((res) =>
      setTimeout(res, 1000 + Math.floor(Math.random() * 3000))
    );

    // Random annualAmount
    const annualAmount = Math.floor(1000 + Math.random() * 5000);

    await this.applicationsService.updateStatus(
      applicationId,
      ApplicationStatus.APPROVED,
      annualAmount
    );

    // Create invoice with fee = min(max(annualAmount * 0.1, 50), 2500)
    const fee = Math.min(Math.max(annualAmount * 0.1, 50), 2500);
    await this.invoicesService.create(applicationId, fee);
  }
}