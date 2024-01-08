import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles/vehicles.service';
import { VehiclesController } from './controllers/vehicles/vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/typeorm/entities/Organization';
import { Vehicle } from 'src/typeorm/entities/Vehicle';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Vehicle])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
