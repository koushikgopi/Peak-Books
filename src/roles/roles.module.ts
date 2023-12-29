import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
