import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Benefit } from '../entities/benefit.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class BenefitsService implements OnModuleInit {
  constructor(
    @InjectRepository(Benefit)
    private benefitRepo: Repository<Benefit>
  ) {}

  async onModuleInit() {
    // Seed from benefit_rules.json
    const filePath = path.join(__dirname, '../../../benefit_rules.json');
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const rules = JSON.parse(content);
      for (const rule of rules) {
        const exists = await this.benefitRepo.findOne({ where: { code: rule.code } });
        if (!exists) {
          await this.benefitRepo.save(
            this.benefitRepo.create({
              code: rule.code,
              name: rule.name,
              description: rule.description || '',
            })
          );
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Could not seed benefits:', err);
    }
  }

  findAll() {
    return this.benefitRepo.find();
  }

  async findById(id: string) {
    return this.benefitRepo.findOne({ where: { id } });
  }
}