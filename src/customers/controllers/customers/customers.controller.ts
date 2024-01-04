import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateCustomerAndAddressDto } from 'src/customers/dtos/createCustomer.dto';
import { UpdateCustomerAndAddressDto } from 'src/customers/dtos/updateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Customer } from 'src/typeorm/entities/Customer';

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  /**
   * @returns Customer data
   */
  @Get()
  @ApiOkResponse({
    description: 'Customer data',
    type: Customer,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  /**
   *  To fetch the customer data
   */
  async getCustomers(
    @Paginate() query: PaginateQuery,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<Paginated<Customer>> {
    const result = await this.customerService.findAll(query, organizationId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Customer  not found ', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param {number} id
   * @returns customer object for a given id
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'To get specific customer object as response',
    type: Customer,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a customer as a response',
  })
  async getCustomerById(@Param('id', ParseIntPipe) id: number) {
    /**
     *This is to check if we got the customer object or not
     */
    const result = await this.customerService.getCustomerById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException('Customer not found ', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @returns created customer data
   */
  @Post()
  @ApiCreatedResponse({
    description: 'Created customer object as response',
    type: CreateCustomerAndAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  async createCustomer(@Body() createCustomerDto: CreateCustomerAndAddressDto) {
    /**
     * To know whether the customer data is created or not
     */
    const result = await this.customerService.createCustomer(createCustomerDto);
    if (result.customer.firstName) {
      return { msg: 'Customer data created successfully', result: result };
    } else {
      throw new HttpException(
        'Unable to create customer data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   * @param {number} id
   * @returns updated data
   */
  @Put(':id')
  @ApiCreatedResponse({
    description: 'To update customer object as response',
    type: UpdateCustomerAndAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to update a customer as a response',
  })
  async updateCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerAndAddressDto,
  ) {
    /**
     * This is to check if we update the customer object using id or not
     */
    const customer = await this.customerService.getCustomerById(id);

    if (customer) {
      const result = await this.customerService.updateCustomer(
        id,
        updateCustomerDto,
      );

      if (result.companyName) {
        return {
          msg: `Customer Object ${result.companyName} Successfully Updated`,
          result: result,
        };
      }
    } else {
      throw new HttpException(
        'Customer Object with specific id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   * @param {number} id
   * To delete the customer data by id
   */
  @Delete(':id')
  @ApiOkResponse({
    description: 'Customer data with Admin deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Customer data with a specified Id not found',
  })
  async deleteCustomerById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To know whether the specified id - customer data is deleted or not
     */
    const customer = await this.customerService.getCustomerById(id);
    if (customer) {
      const result = await this.customerService.deleteCustomer(id);
      return {
        msg: `Customer data with ${customer.companyName} deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Customer data with a specified id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
