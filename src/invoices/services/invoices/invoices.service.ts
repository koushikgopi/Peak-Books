import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { CreateInvoiceAndLineItemDto } from 'src/invoices/dtos/createInvoiceDto';
import { UpdateInvoiceAndLineItemDto } from 'src/invoices/dtos/updateInvoiceDto';
import { Account } from 'src/typeorm/entities/Account';
import { Customer } from 'src/typeorm/entities/Customer';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { LineItem } from 'src/typeorm/entities/LineItem';
import { Organization } from 'src/typeorm/entities/Organization';
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { Repository, DataSource } from 'typeorm';
@Injectable()
export class InvoicesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(LineItem)
    private lineItemRepository: Repository<LineItem>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  public async findAll(
    query: PaginateQuery,
    organizationId: number,
  ): Promise<Paginated<Invoice>> {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      const invoices = paginate(query, this.invoiceRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['id', 'invoiceDate'],
        defaultSortBy: [['id', 'DESC']],
        where: { organization: orgData },
        select: [],
        relations: [
          'organization',
          'customer',
          'lineItem',
          'account',
          'vehicle',
        ],
        filterableColumns: {
          id: [FilterOperator.EQ],
        },
      });
      return invoices;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getInvoiceById(id: number) {
    try {
      const data = await this.invoiceRepository.findOne({
        where: { id: id },
        relations: [
          'organization',
          'customer.address',
          'lineItem',
          'account',
          'vehicle',
        ],
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createInvoice(invoiceDetails: CreateInvoiceAndLineItemDto) {
    let lineItems;

    try {
      let invoice;
      const organizationData = await this.organizationRepository.findOne({
        where: { id: invoiceDetails.invoiceValue.organizationId },
      });
      if (!organizationData) {
        throw new BadRequestException('Organization id not found');
      }
      const customerData = await this.customerRepository.findOne({
        where: { id: invoiceDetails.invoiceValue.customerId },
        relations: ['address'],
      });
      if (!customerData) {
        throw new BadRequestException('Customer id not found');
      }
      const accountData = await this.accountRepository.findOne({
        where: { id: invoiceDetails.invoiceValue.accountId },
      });
      if (!accountData) {
        throw new BadRequestException('Account id not found');
      }
      const vehicleData = await this.vehicleRepository.findOne({
        where: { id: invoiceDetails.invoiceValue.vehicleId },
      });
      if (!vehicleData) {
        throw new BadRequestException('Vehicle id not found');
      }
      const lastInvoiceSequenceNumber = await this.invoiceRepository.findOne({
        where: { organization: organizationData },
        order: {
          invoiceSequence: 'DESC', //'ASC'
        },
      });
      const invoiceSeq = lastInvoiceSequenceNumber
        ? lastInvoiceSequenceNumber.invoiceSequence + 1
        : 1001;

      const newInvoice = this.invoiceRepository.create({
        ...invoiceDetails.invoiceValue,
        invoiceSequence: invoiceSeq,
        customer: customerData,
        organization: organizationData,
        vehicle: vehicleData,
        account: accountData,
        invoiceStatus: 'Unpaid',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const result = await this.invoiceRepository.save(newInvoice);

      const newValue = invoiceDetails.lineItemValue;
      lineItems = invoiceDetails.lineItemValue.map((element) => {
        return {
          itemName: element.itemName,
          description: element.description,
          HSNorSAC: element.HSNorSAC,
          unit: element.unit,
          packagingType: element.packagingType,
          numberOfPackage: element.numberOfPackage,
          quantity: element.quantity,
          rate: element.rate,
          totalTaxRate: element.totalTaxRate,
          amount: element.amount,
          isActive: element.isActive,
          createdAt: new Date(),
          createdBy: 'Admin',
          updatedAt: new Date(),
          updatedBy: 'Admin',
          invoice: newInvoice,
        };
      });
      const data1 = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(LineItem)
        .values(lineItems)
        .execute();

      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateInvoice(
    id: number,
    updateInvoiceDetails: UpdateInvoiceAndLineItemDto,
  ) {
    try {
      const customerData = await this.customerRepository.findOne({
        where: { id: updateInvoiceDetails.invoiceValue.customer },
        relations: ['address'],
      });
      if (!customerData) {
        throw new BadRequestException('Customer id not found');
      }
      const accountData = await this.accountRepository.findOne({
        where: { id: updateInvoiceDetails.invoiceValue.account },
      });
      if (!accountData) {
        throw new BadRequestException('Account id not found');
      }
      const vehicleData = await this.vehicleRepository.findOne({
        where: { id: updateInvoiceDetails.invoiceValue.vehicle },
      });
      if (!vehicleData) {
        throw new BadRequestException('Vehicle id not found');
      }

      const organizationData = await this.organizationRepository.findOne({
        where: { id: updateInvoiceDetails.invoiceValue.organization },
      });

      if (!organizationData) {
        throw new BadRequestException('Organization id not found');
      }
      const invoiceData = await this.invoiceRepository.findOne({
        where: { id: id },
      });
      if (!invoiceData) {
        throw new BadRequestException('InvoiceData id not found');
      }
      console.log(updateInvoiceDetails.invoiceValue);
      await this.invoiceRepository.update(
        { id },
        {
          ...updateInvoiceDetails.invoiceValue,
          customer: customerData,
          organization: organizationData,
          account: accountData,
          vehicle: vehicleData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );
      for (let i = 0; i < updateInvoiceDetails.lineItemValue.length; i++) {
        if (updateInvoiceDetails.lineItemValue[i].id === 0) {
          const invoiceData = await this.invoiceRepository.findOne({
            where: { id: id },
          });
          if (!invoiceData) {
            throw new BadRequestException('InvoiceData id not found');
          }
          const lineItemData = await this.lineItemRepository.create({
            ...updateInvoiceDetails.lineItemValue[i],
            invoice: invoiceData,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'Admin',
            updatedBy: 'Admin',
          });
          const newLineItem = await this.lineItemRepository.save(lineItemData);
        } else {
          const invoiceData = await this.invoiceRepository.findOne({
            where: { id: id },
          });
          if (!invoiceData) {
            throw new BadRequestException('InvoiceData id not found');
          }
          await this.lineItemRepository.update(
            { id: updateInvoiceDetails.lineItemValue[i].id },
            {
              ...updateInvoiceDetails.lineItemValue[i],
              invoice: invoiceData,
              updatedAt: new Date(),
              updatedBy: 'Admin',
            },
          );
        }
      }
      const data = await this.invoiceRepository.findOne({
        where: { id },
        relations: ['lineItem', 'customer.address', 'vehicle', 'account'],
      });
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @param {number} id
   * To delete the invoice data by id
   */
  async deleteLineItem(id: number) {
    try {
      const data = await this.lineItemRepository.findOne({
        where: { id: id },
      });
      if (data) {
        await this.lineItemRepository.delete(data);
        return data;
      } else {
        throw new HttpException(
          'LineItem data with a specified Id not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  /**
   * @param {number} id
   * To delete the invoice data by id
   */

  async deleteInvoice(id: number) {
    try {
      let invoiceTaxesId = null;
      const data = await this.invoiceRepository.findOne({
        where: { id: id },
        relations: ['lineItem', 'invoiceTaxes'],
      });
      if (!data) {
        throw new HttpException(
          'Invoice data with a specified Id not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (data) {
        for (let i = 0; i < data.lineItem.length; i++) {
          const result = await this.deleteLineItem(data.lineItem[i].id);
        }
      }
      await this.invoiceRepository.delete(id);
      return data;
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This invoice is assigned to a test,cannot delete it',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
