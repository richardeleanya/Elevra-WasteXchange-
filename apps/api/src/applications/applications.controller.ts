import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post(':benefitId')
  async apply(@Req() req, @Param('benefitId') benefitId: string) {
    return this.applicationsService.create(req.user.userId, benefitId);
  }

  @Get()
  async getMyApplications(@Req() req) {
    return this.applicationsService.findByUser(req.user.userId);
  }
}