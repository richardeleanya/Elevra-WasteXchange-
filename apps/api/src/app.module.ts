import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HouseholdModule } from './household/household.module';
import { BenefitsModule } from './benefits/benefits.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { ApplicationsModule } from './applications/applications.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { User } from './entities/user.entity';
import { Household } from './entities/household.entity';
import { Benefit } from './entities/benefit.entity';
import { Application } from './entities/application.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Household, Benefit, Application, Invoice],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: { host: process.env.REDIS_HOST || 'localhost', port: 6379 },
    }),
    AuthModule,
    UsersModule,
    HouseholdModule,
    BenefitsModule,
    EligibilityModule,
    ApplicationsModule,
    InvoicesModule,
  ],
})
export class AppModule {}
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HouseholdModule } from './household/household.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { BenefitsModule } from './benefits/benefits.module';
import { ApplicationsModule } from './applications/applications.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          host: 'redis',
          port: 6379,
        },
      }),
    }),
    UsersModule,
    AuthModule,
    HouseholdModule,
    EligibilityModule,
    BenefitsModule,
    ApplicationsModule,
    InvoicesModule,
    CommonModule,
  ],
})
export class AppModule {}