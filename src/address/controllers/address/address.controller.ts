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
import { CreateAddressDto } from 'src/address/dtos/createAddress.dto';
import { UpdateAddressDto } from 'src/address/dtos/updateAddress.dto';
import { AddressService } from 'src/address/services/address/address.service';
import { Address } from 'src/typeorm/entities/Address';
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  @ApiOkResponse({
    description: 'Address data',
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  /**
   *  To fetch the address data
   */
  async getAddress(
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ) {
    const result = await this.addressService.findAll(organizationId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Address not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'To get specific address object as response',
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a address as a response',
  })
  async getAddressById(@Param('id', ParseIntPipe) id: number) {
    /**
     *This is to check if we got the address object or not
     */
    const result = await this.addressService.getAddressById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException('Address not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created address object as response',
    type: CreateAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    /**
     * To know whether the address data is created or not
     */
    const result = await this.addressService.createAddress(createAddressDto);
    if (result) {
      return { msg: 'Address data created successfully', result: result };
    } else {
      throw new HttpException(
        'Unable to create address data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'To update address object as response',
    type: UpdateAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to update a address as a response',
  })
  async updateAddressById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    /**
     * This is to check if we update the address object using id or not
     */
    const address = await this.addressService.getAddressById(id);

    if (address) {
      const result = await this.addressService.updateAddress(
        id,
        updateAddressDto,
      );

      if (result) {
        return {
          msg: `Address Object Successfully Updated`,
          result: result,
        };
      }
    } else {
      throw new HttpException(
        'Address Object with specific id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Address data deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Address data with a specified Id not found',
  })
  async deleteAddressById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To know whether the specified id - address data is deleted or not
     */
    const address = await this.addressService.getAddressById(id);
    if (address) {
      const result = await this.addressService.deleteAddress(id);
      return {
        msg: `Address data deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Address data with a specified id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
