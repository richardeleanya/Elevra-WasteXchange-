import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Household } from '../entities/household.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseholdService {
  constructor(
    @InjectRepository(Household)
    private householdRepo: Repository<Household>
  ) {}

  async upsert(userId: string, data: Partial<Household>) {
    let record = await this.householdRepo.findOne({ where: { userId } });
    if (record) {
      Object.assign(record, data);
      return this.householdRepo.save(record);
    } else {
      const household = this.householdRepo.create({ ...data, userId });
      return this.householdRepo.save(household);
    }
  }

  async findByUser(userId: string) {
    return this.householdRepo.findOne({ where: { userId } });
  }
}