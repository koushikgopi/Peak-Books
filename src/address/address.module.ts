import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address/address.controller';
import { AddressService } from './services/address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { Organization } from 'src/typeorm/entities/Organization';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Organization])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
