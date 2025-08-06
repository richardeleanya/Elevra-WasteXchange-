import { Controller, Get, Query } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('admin/integrations')
export class IntegrationsController {
  constructor(private readonly integrations: IntegrationsService) {}

  @Get()
  async getLogs(@Query('userId') userId?: string) {
    return this.integrations.getLogs(userId);
  }
}