import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/address/dtos/createAddress.dto';
import { UpdateAddressDto } from 'src/address/dtos/updateAddress.dto';
import { Address } from 'src/typeorm/entities/Address';
import { Organization } from 'src/typeorm/entities/Organization';
import { CreateAddressType, UpdateAddressType } from 'src/utils/types/address';
import { Repository } from 'typeorm';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  public async findAll(organizationId: number) {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      const address = await this.addressRepository.find({
        where: { organization: orgData },
      });
      return address;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAddressById(id: number) {
    try {
      const data = await this.addressRepository.findOne({
        where: { id: id },
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAddress(createAddress: CreateAddressType) {
    try {
      const newAddress = createAddress.addresses.map((element) => {
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
        newAddress,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateAddress(id: number, updateAddressDetails: UpdateAddressType) {
    try {
      // const customerData = await this.customerRepository.findOne({
      //     where: { id: id },
      //   });
      //   if (!customerData) {
      //     throw new BadRequestException('Customer id not found');
      //   }
      //   const orgData = await this.organizationRepository.findOne({
      //     where: {
      //       id: updateAddressDetails.organization,
      //     },
      //   });
      //   if (!orgData) {
      //     throw new BadRequestException('Organization id not found');
      //   }
      for (const element of updateAddressDetails.addresses) {
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
          },
        );
        console.log(datas);
      }
      const data = await this.addressRepository.findOne({
        where: { id },
        relations: ['role', 'organization', 'address'],
      });
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAddress(id: number) {
    try {
      const data = await this.addressRepository.findOne({
        where: { id: id },
      });
      if (!data) {
        throw new BadRequestException('Address id not found');
      }
      if (data) {
        await this.addressRepository.delete(id);
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
