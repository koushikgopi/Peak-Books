import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateInvoiceAndLineItemDto } from 'src/invoices/dtos/createInvoiceDto';
import { UpdateInvoiceAndLineItemDto } from 'src/invoices/dtos/updateInvoiceDto';
import { InvoicesService } from 'src/invoices/services/invoices/invoices.service';
import { Invoice } from 'src/typeorm/entities/Invoice';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}

  /**
   * @returns  invoice data fetched from database
   */
  @Get()
  @ApiOkResponse({
    description: 'Invoice data',
    type: Invoice,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  //To fetch the invoice data
  async getInvoices(
    @Paginate() query: PaginateQuery,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<Paginated<Invoice>> {
    const result = await this.invoiceService.findAll(query, organizationId);
    if (result.data.length === 0) {
      throw new HttpException(
        ` No data found in  Invoice`,
        HttpStatus.NO_CONTENT,
      );
    } else if (result.data.length > 0) {
      return result;
    } else {
      throw new HttpException(
        'Unable to fetch Invoice data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Invoice data for a particular id',
    type: Invoice,
  })
  @ApiBadRequestResponse({
    description: 'Invoice data with a specified Id not found',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To check if we got the invoice data with a specified Id or not
     */
    const invoice = await this.invoiceService.getInvoiceById(id);
    if (invoice) {
      return invoice;
    } else {
      throw new HttpException(
        'Invoice data with a specified Id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @returns created invoice data   one line item many invoices
   */

  @Post()
  @ApiCreatedResponse({
    description: 'To create invoice object as response',
    type: CreateInvoiceAndLineItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to create a invoice as a response',
  })
  async createInvoice(
    @Body() createInvoiceAndLineItemDto: CreateInvoiceAndLineItemDto,
  ) {
    /**
     * To know whether the invoice data is created or not
     */
    const result = await this.invoiceService.createInvoice(
      createInvoiceAndLineItemDto,
    );

    if (result) {
      return {
        msg: 'Invoice successfully created',
        result: result,
      };
    } else {
      throw new HttpException(
        'Not able to create a invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @param {number} id
   * @returns Updated invoice data of a specified id
   */
  @Put(':id')
  @ApiOkResponse({
    description: 'Updated Invoice data ',
    type: UpdateInvoiceAndLineItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Invoice data with a specified Id not found',
  })
  async updateInvoiceById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvoiceDto: UpdateInvoiceAndLineItemDto,
  ) {
    /**
     * To know whether the invoice data with specified Id is updated or not
     */
    const invoice = await this.invoiceService.getInvoiceById(id);
    if (invoice) {
      const data = await this.invoiceService.updateInvoice(
        id,
        updateInvoiceDto,
      );
      if (data)
        return {
          message: 'Invoice data  Successfully Updated',
          result: data,
        };
    } else {
      throw new HttpException(
        'Invoice data with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'LineItemId data with deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'LineItemId data with a specified Id not found',
  })
  async deleteInvoiceById(@Query('id', ParseIntPipe) id: number) {
    /**
     * To know whether the specified Id - tester data is deleted or not
     */
    const result = await this.invoiceService.deleteInvoice(id);
    if (result) {
      return {
        msg: `InvoiceItem data with ${result.email} deleted successfully`,
      };
    } else {
      throw new HttpException(
        'InvoiceItem with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
