import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/typeorm/entities/Customer';
import { Address } from 'src/typeorm/entities/Address';
import { Role } from 'src/typeorm/entities/Role';
import { Organization } from 'src/typeorm/entities/Organization';
import { AddressService } from 'src/address/services/address/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Address, Role, Organization])],
  providers: [CustomersService, AddressService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
