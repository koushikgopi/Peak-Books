import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';

@Module({
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
