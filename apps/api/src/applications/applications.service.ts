import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Benefit } from '../entities/benefit.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private appRepo: Repository<Application>,
    @InjectRepository(Benefit)
    private benefitRepo: Repository<Benefit>,
    @InjectQueue('applications')
    private applicationsQueue: Queue
  ) {}

  async create(userId: string, benefitId: string) {
    const benefit = await this.benefitRepo.findOne({ where: { id: benefitId } });
    if (!benefit) throw new Error('Benefit not found');
    const app = this.appRepo.create({
      userId,
      benefitId,
      status: ApplicationStatus.PENDING,
    });
    const saved = await this.appRepo.save(app);
    await this.applicationsQueue.add('submitApplication', { applicationId: saved.id });
    return saved;
  }

  findByUser(userId: string) {
    return this.appRepo.find({ where: { userId }, relations: ['benefit'] });
  }

  async updateStatus(id: string, status: ApplicationStatus, annualAmount?: number) {
    await this.appRepo.update(id, { status, annualAmount });
  }

  async findById(id: string) {
    return this.appRepo.findOne({ where: { id } });
  }
}