import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Address } from 'src/typeorm/entities/Address';
import { Organization } from 'src/typeorm/entities/Organization';
import {
  CreateOrganizationAndAddressType,
  UpdateOrganizationAndAddressType,
} from 'src/utils/types/organization';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Organization>> {
    try {
      return paginate(query, this.organizationRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['organizationName', 'organizationDescription'],
        defaultSortBy: [['id', 'DESC']],
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrganizationById(id: number) {
    try {
      const data = await this.organizationRepository.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createOrganization(
    organizationDetails: CreateOrganizationAndAddressType,
  ) {
    try {
      const newOrganization = await this.organizationRepository.create({
        ...organizationDetails,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const org = await this.organizationRepository.save(newOrganization);
      const newAddress = organizationDetails.addresses.map((element) => {
        return {
          objectType: element.objectType,
          addressType: element.addressType,
          addressLine1: element.addressLine1.replace(',', ''),
          addressLine2: element.addressLine2,
          city: element.city,
          state: element.state,
          stateCode: element.stateCode,
          country: element.country,
          zipCode: element.zipCode,
          latitude: element.latitude,
          longitude: element.longitude,
          placeId: element.placeId,
          createdAt: new Date(),
          createdBy: 'Admin',
          updatedAt: new Date(),
          updatedBy: 'Admin',
          organization: org,
        };
      });

      let address;
      for (let i = 0; i < newAddress.length; i++) {
        if (
          newAddress[i].addressType === 'MA_ADD' ||
          newAddress[i].addressType === 'SA_ADD'
        ) {
          address = await this.addressRepository.save(newAddress[i]);
          console.log(address);
        }
      }
      return {
        org,
        newAddress,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateOrganization(
    id: number,
    updateOrganizationDetails: UpdateOrganizationAndAddressType,
  ) {
    try {
      const data = await this.organizationRepository.findOne({
        where: { id: id },
      });
      await this.organizationRepository.update(
        { id },
        {
          ...updateOrganizationDetails,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );
      const organizationData = await this.organizationRepository.findOne({
        where: { id },
      });
      for (const element of updateOrganizationDetails.addresses) {
        const datas = await this.addressRepository.update(
          { id: element.id },
          {
            objectType: element.objectType,
            addressType: element.addressType,
            addressLine1: element.addressLine1.replace(',', ''),
            addressLine2: element.addressLine2,
            city: element.city,
            state: element.state,
            stateCode: element.stateCode,
            country: element.country,
            zipCode: element.zipCode,
            latitude: element.latitude,
            longitude: element.longitude,
            placeId: element.placeId,
            updatedAt: new Date(),
            updatedBy: 'Admin',
            organization: organizationData,
          },
        );
        console.log(datas);
      }
      return { ...organizationData };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrganization(id: number) {
    try {
      const data = await this.organizationRepository.findOne({
        where: { id: id },
      });
      if (data) {
        const org = await this.organizationRepository.delete(id);
      }
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This organization is assigned,cannot delete a organization',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
