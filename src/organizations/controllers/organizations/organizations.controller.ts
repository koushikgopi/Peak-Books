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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateOrganizationAndAddressDto } from 'src/organizations/dtos/createMyOrganization.dto';
import { UpdateOrganizationAndAddressDto } from 'src/organizations/dtos/updateMyOrganization.dto';
import { OrganizationsService } from 'src/organizations/services/organizations/organizations.service';
import { Organization } from 'src/typeorm/entities/Organization';

@ApiTags('Organization')
@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  @ApiOkResponse({
    description: 'To get organization object as response',
    type: Organization,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a organization as a response',
  })
  async getOrganizations(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Organization>> {
    const result = await this.organizationsService.findAll(query);
    if (result.data.length === 0) {
      throw new HttpException(
        ` No data found in  Organization `,
        HttpStatus.NO_CONTENT,
      );
    } else if (result.data.length > 0) {
      return result;
    } else {
      throw new HttpException(
        'Organization not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'To get specific organization object as response',
    type: Organization,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a organization object for a given id',
  })
  async getOrganizationById(@Param('id', ParseIntPipe) id: number) {
    const organization = await this.organizationsService.getOrganizationById(
      id,
    );
    if (organization) {
      return organization;
    } else {
      throw new HttpException(
        'Organization object for a given id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'To create organization object as response',
    type: CreateOrganizationAndAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to create a organization as a response',
  })
  @UsePipes(new ValidationPipe())
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationAndAddressDto,
  ) {
    const result = await this.organizationsService.createOrganization(
      createOrganizationDto,
    );
    if (result) {
      return {
        msg: 'Organization successfully created',
        result: result,
      };
    } else {
      throw new HttpException(
        'Not able to create a organization',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'To update organization object as response',
    type: UpdateOrganizationAndAddressDto,
  })
  @ApiBadRequestResponse({
    description: 'not able to update a organization as a response',
  })
  @UsePipes(new ValidationPipe())
  async updateOrganizationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrganizationDetails: UpdateOrganizationAndAddressDto,
  ) {
    const organization = await this.organizationsService.getOrganizationById(
      id,
    );

    if (organization) {
      const result = await this.organizationsService.updateOrganization(
        id,
        updateOrganizationDetails,
      );
      if (result) {
        return {
          msg: `Organization data ${organization.organizationName} successfully updated`,

          result: result,
        };
      }
    } else {
      throw new HttpException(
        'Not able to update a organization',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Organization data with Admin successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Not able to delete a organization as a response',
  })
  async deleteOrganizationById(@Param('id', ParseIntPipe) id: number) {
    const organization = await this.getOrganizationById(id);
    if (organization) {
      const result = await this.organizationsService.deleteOrganization(id);
      return {
        msg: `Organization data  ${organization.organizationName} deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Not able to delete a organization',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
