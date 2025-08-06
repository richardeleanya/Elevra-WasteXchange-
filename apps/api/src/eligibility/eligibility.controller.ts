import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('eligibility')
@UseGuards(JwtAuthGuard)
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Get()
  async getEligibility(@Req() req) {
    return this.eligibilityService.evaluate(req.user.userId);
  }
}