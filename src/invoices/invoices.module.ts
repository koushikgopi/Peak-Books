import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices/invoices.controller';
import { InvoicesService } from './services/invoices/invoices.service';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
