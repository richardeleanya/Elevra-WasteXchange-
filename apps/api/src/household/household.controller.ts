import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsNumber, IsEnum, IsBoolean, IsInt, Min } from 'class-validator';
import { HousingType } from '../entities/household.entity';

class UpsertHouseholdDto {
  @IsNumber()
  income: number;

  @IsEnum(HousingType)
  housing: HousingType;

  @IsBoolean()
  disability: boolean;

  @IsInt()
  @Min(0)
  childrenCount: number;

  @IsInt()
  @Min(0)
  adultsCount: number;
}

@Controller('household')
@UseGuards(JwtAuthGuard)
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Post()
  async upsert(@Req() req, @Body() dto: UpsertHouseholdDto) {
    return this.householdService.upsert(req.user.userId, dto);
  }

  @Get()
  async get(@Req() req) {
    return this.householdService.findByUser(req.user.userId);
  }
}