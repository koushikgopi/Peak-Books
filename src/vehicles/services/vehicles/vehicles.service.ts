import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Organization } from 'src/typeorm/entities/Organization';
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { CreateVehicleType, UpdateVehicleType } from 'src/utils/types/vehicle';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  public async findAll(
    query: PaginateQuery,
    organizationId: number,
  ): Promise<Paginated<Vehicle>> {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      const vehicleData = await paginate(query, this.vehicleRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['nameOfDriver', 'model'],
        defaultSortBy: [['id', 'DESC']],
        where: { organization: orgData },
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
      return vehicleData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getVehicleById(id: number) {
    try {
      const data = await this.vehicleRepository.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createVehicle(vehicleDetails: CreateVehicleType) {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: vehicleDetails.organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }

      const data = await this.vehicleRepository.find({
        where: {
          organization: orgData,
          licenseNo: vehicleDetails.licenseNo,
        },
      });
      if (data.length > 0) {
        throw new ConflictException('License number already exists');
      }

      const newVehicle = this.vehicleRepository.create({
        ...vehicleDetails,
        organization: orgData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const vehicleData = await this.vehicleRepository.save(newVehicle);
      return vehicleData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateVehicle(id: number, updateVehicleDetails: UpdateVehicleType) {
    try {
      const vehicleData = await this.vehicleRepository.findOne({
        where: { id: id },
      });
      if (!vehicleData) {
        throw new BadRequestException('Vehicle id not found');
      }
      const orgData = await this.organizationRepository.findOne({
        where: {
          id: updateVehicleDetails.organization,
        },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      await this.vehicleRepository.update(
        { id },
        {
          ...updateVehicleDetails,
          organization: orgData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );
      const data = await this.vehicleRepository.findOne({
        where: { id },
        relations: ['organization'],
      });
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteByVehicleId(id: number) {
    try {
      const vehicleData = await this.vehicleRepository.findOne({
        where: { id: id },
      });
      if (vehicleData) {
        const data = await this.vehicleRepository.delete(id);
        return data;
      } else {
        throw new BadRequestException('vehicle data id not found');
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
