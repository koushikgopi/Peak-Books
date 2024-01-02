import { Module } from '@nestjs/common';
import { OrganizationsService } from './services/organizations/organizations.service';
import { OrganizationsController } from './controllers/organizations/organizations.controller';

@Module({
  providers: [OrganizationsService],
  controllers: [OrganizationsController]
})
export class OrganizationsModule {}
