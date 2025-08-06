import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationLog } from '../entities/integration_log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(IntegrationLog)
    private readonly logs: Repository<IntegrationLog>
  ) {}

  async getLogs(userId?: string) {
    if (userId) {
      return this.logs.find({ where: { userId } });
    }
    return this.logs.find();
  }
}