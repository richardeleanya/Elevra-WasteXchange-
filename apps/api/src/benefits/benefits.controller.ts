import { Controller, Get, UseGuards } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('benefits')
@UseGuards(JwtAuthGuard)
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Get()
  findAll() {
    return this.benefitsService.findAll();
  }
}