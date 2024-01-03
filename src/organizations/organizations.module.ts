import { Module } from '@nestjs/common';
import { OrganizationsService } from './services/organizations/organizations.service';
import { OrganizationsController } from './controllers/organizations/organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/typeorm/entities/Organization';
import { Address } from 'src/typeorm/entities/Address';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Address])],
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}
