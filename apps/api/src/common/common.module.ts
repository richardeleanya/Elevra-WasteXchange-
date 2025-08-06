import { Module } from '@nestjs/common';
// If RolesGuard is defined elsewhere, import it here.
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './roles.guard';

@Module({
  imports: [],
  providers: [
    // { provide: APP_GUARD, useClass: RolesGuard }, // Uncomment if RolesGuard is implemented
  ],
  exports: [
    // RolesGuard, // Uncomment if RolesGuard is implemented
  ],
})
export class CommonModule {}