import { Controller, Post, Body } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';

@Controller('evaluate')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post()
  async evaluate(@Body() payload: any) {
    return this.eligibilityService.evaluate(payload);
  }
}