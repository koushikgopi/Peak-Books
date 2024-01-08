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
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { CreateVehicleDto } from 'src/vehicles/dtos/createVehicle.dto';
import { UpdateVehicleDto } from 'src/vehicles/dtos/updateVehicle.dto';
import { VehiclesService } from 'src/vehicles/services/vehicles/vehicles.service';
@ApiTags('Vehicle')
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Vehicle data',
    type: Vehicle,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  /**
   *  To fetch the vehicle data
   */
  async getVehicleData(
    @Paginate() query: PaginateQuery,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<Paginated<Vehicle>> {
    const result = await this.vehicleService.findAll(query, organizationId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Vehicle not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'To get specific vehicle object as response',
    type: Vehicle,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a vehicle as a response',
  })
  async getVehicleById(@Param('id', ParseIntPipe) id: number) {
    /**
     *This is to check if we got the vehicle object for the given id
     */
    const result = await this.vehicleService.getVehicleById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException(
        'Vehicle Data for the given id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created vehicle object as response',
    type: CreateVehicleDto,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    /**
     * To know whether the vehicle data is created or not
     */
    const result = await this.vehicleService.createVehicle(createVehicleDto);
    if (result) {
      return { msg: 'Vehicle data created successfully', result: result };
    } else {
      throw new HttpException(
        'Unable to create vehicle data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'To update vehicle object as response',
    type: UpdateVehicleDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to update a customer as a response',
  })
  async updateVehicleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    /**
     * This is to check if we update the vehicle object using id or not
     */
    const vehicle = await this.vehicleService.getVehicleById(id);

    if (vehicle) {
      const result = await this.vehicleService.updateVehicle(
        id,
        updateVehicleDto,
      );

      if (result) {
        return {
          msg: 'Vehicle Object Successfully Updated',
          result: result,
        };
      }
    } else {
      throw new HttpException(
        'Vehicle Object with specific id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Vehicle data successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Not able to delete a vehicle data as a response',
  })
  async deleteVehicleById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.vehicleService.deleteByVehicleId(id);
    if (result) {
      return {
        msg: 'Vehicle data deleted successfully',
      };
    } else {
      throw new HttpException(
        'Not able to delete a organization',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
