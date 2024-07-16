import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices/invoices.controller';
import { InvoicesService } from './services/invoices/invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { Organization } from 'src/typeorm/entities/Organization';
import { Customer } from 'src/typeorm/entities/Customer';
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { Account } from 'src/typeorm/entities/Account';
import { LineItem } from 'src/typeorm/entities/LineItem';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Organization,
      Customer,
      Vehicle,
      Account,
      LineItem,
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
