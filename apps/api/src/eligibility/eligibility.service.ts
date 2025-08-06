import { Injectable, OnModuleInit } from '@nestjs/common';
import { BenefitsService } from '../benefits/benefits.service';
import { UsersService } from '../users/users.service';
import { HouseholdService } from '../household/household.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class EligibilityService implements OnModuleInit {
  private rules: any[] = [];

  constructor(
    private benefitsService: BenefitsService,
    private usersService: UsersService,
    private householdService: HouseholdService
  ) {}

  async onModuleInit() {
    const filePath = path.join(__dirname, '../../../benefit_rules.json');
    try {
      const content = await fs.readFile(filePath, 'utf8');
      this.rules = JSON.parse(content);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not load eligibility rules:', err);
      this.rules = [];
    }
  }

  async evaluate(userId: string) {
    // Dummy: just return all benefits with random probabilities for now
    const benefits = await this.benefitsService.findAll();
    return benefits.map((b) => ({
      benefitId: b.id,
      probability: Math.random(),
    }));
  }
}