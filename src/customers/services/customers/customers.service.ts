import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Address } from 'src/typeorm/entities/Address';
import { Customer } from 'src/typeorm/entities/Customer';
import { Organization } from 'src/typeorm/entities/Organization';
import { Role } from 'src/typeorm/entities/Role';
import {
  CreateCustomerAndAddressType,
  UpdateCustomerAndAddressType,
} from 'src/utils/types/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  /**
   * @returns customer data
   */
  public async findAll(
    query: PaginateQuery,
    organizationId: number,
  ): Promise<Paginated<Customer>> {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      const customers = await paginate(query, this.customerRepository, {
        sortableColumns: ['id'],
        searchableColumns: [
          'companyName',
          'address.city',
          'address.state',
          'phoneNo',
          'firstName',
          'lastName',
        ],
        defaultSortBy: [['id', 'DESC']],
        where: { organization: orgData, isDelete: false },
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
        relations: ['address'],
      });
      return customers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @param {number} id
   * @returns customer data of a given id
   */
  async getCustomerById(id: number) {
    try {
      const data = await this.customerRepository.findOne({
        where: { id: id, isDelete: false },
        relations: ['address'],
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @returns created customer data
   */
  async createCustomer(
    customerDetailsAndAddress: CreateCustomerAndAddressType,
  ) {
    try {
      const roleData = await this.roleRepository.findOne({
        where: { id: 2 },
      });
      if (!roleData) {
        throw new BadRequestException('Role id not found');
      }
      const orgData = await this.organizationRepository.findOne({
        where: { id: customerDetailsAndAddress.customerDetails.organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }

      const newCustomer = this.customerRepository.create({
        ...customerDetailsAndAddress.customerDetails,
        role: roleData,
        organization: orgData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const customer = await this.customerRepository.save(newCustomer);

      const newAddress = customerDetailsAndAddress.addresses.map((element) => {
        return {
          objectType: 'Customer',
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
          customer: newCustomer,
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
        customer,
        newAddress,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  /**
   * @param {number} id
   * @returns Updated customer data of a specified id
   */
  async updateCustomer(
    id: number,
    updateCustomerAndAddressDetails: UpdateCustomerAndAddressType,
  ) {
    try {
      const customerData = await this.customerRepository.findOne({
        where: { id: id, isDelete: false },
      });
      if (!customerData) {
        throw new BadRequestException('Customer id not found');
      }
      const orgData = await this.organizationRepository.findOne({
        where: {
          id: updateCustomerAndAddressDetails.customerDetails.organization,
        },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      await this.customerRepository.update(
        { id },
        {
          ...updateCustomerAndAddressDetails.customerDetails,
          organization: orgData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );

      for (const element of updateCustomerAndAddressDetails.addresses) {
        const datas = await this.addressRepository.update(
          { id: element.id },
          {
            objectType: 'Customer',
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
            customer: customerData,
            organization: customerData.organization,
          },
        );
        console.log(datas);
      }
      const data = await this.customerRepository.findOne({
        where: { id },
        relations: ['role', 'organization', 'address'],
      });
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  /**
   * @param {number} id
   * To delete the customer data by id
   */
  async deleteCustomer(id: number) {
    try {
      const data = await this.customerRepository.findOne({
        where: { id: id, isDelete: false },
      });
      if (!data) {
        throw new BadRequestException('Customer id not found');
      }
      if (data) {
        await this.customerRepository.update(
          {
            id: id,
          },
          {
            isDelete: true,
            updatedAt: new Date(),
            updatedBy: 'Admin',
          },
        );
      }
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This customer is assigned ,cannot delete a customer',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
