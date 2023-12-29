import { ApiTags } from '@nestjs/swagger';
import { RolesService } from 'src/roles/services/roles/roles.service';
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
} from '@nestjs/swagger';
import { Role } from 'src/typeorm/entities/Role';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateRoleDto } from 'src/roles/dtos/createRole.dto';
import { UpdateRoleDto } from 'src/roles/dtos/updateRole.dto';

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  /**
   * @returns  role data fetched from database
   */
  @Get()
  @ApiOkResponse({
    description: 'role data',
    type: Role,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  //To fetch the role data
  async getRoles(@Paginate() query: PaginateQuery): Promise<Paginated<Role>> {
    const result = await this.roleService.findAll(query);
    if (result.data.length === 0) {
      throw new HttpException(` no data found in  Role`, HttpStatus.NO_CONTENT);
    } else if (result.data.length > 0) {
      return result;
    } else {
      throw new HttpException(
        'Unable to fetch Role data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To check if we got the role data with a specified Id or not
     */
    const role = await this.roleService.getRoleById(id);
    if (role) {
      return role;
    } else {
      throw new HttpException(
        'Role data with a specified Id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @returns created role data
   */

  @Post()
  @ApiCreatedResponse({
    description: 'to create role object as response',
    type: Role,
  })
  @ApiBadRequestResponse({
    description: 'not able to create a role as a response',
  })
  @UsePipes(new ValidationPipe())
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    /**
     * To know whether the customer data is created or not
     */
    const result = await this.roleService.createRole(createRoleDto);
    if (result.roleName) {
      return {
        msg: 'Role successfully created',
        result: result,
      };
    } else {
      throw new HttpException(
        'Not able to create a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**
   * @param {number} id
   * @returns Updated role data of a specified id
   */
  @Put(':id')
  @ApiOkResponse({
    description: 'Updated Role data ',
    type: Role,
  })
  @ApiBadRequestResponse({
    description: 'Role data with a specified Id not found',
  })
  @UsePipes(new ValidationPipe())
  async updateRoleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    /**
     * To know whether the role data with specified Id is updated or not
     */
    const role = await this.roleService.getRoleById(id);
    if (role) {
      const data = await this.roleService.updateRole(id, updateRoleDto);
      if (data)
        return {
          message: `Role data with ${role.roleName} Successfully Updated`,
          result: data,
        };
    } else {
      throw new HttpException(
        'Role data with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete(':id')
  @ApiOkResponse({
    description: 'Role data with Admin deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Role data with a specified Id not found',
  })
  async deleteRoleById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To know whether the specified Id - role data is deleted or not
     */
    const role = await this.roleService.getRoleById(id);
    if (role) {
      await this.roleService.deleteRole(id);
      return {
        msg: `Role data with ${role.roleName} deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Role data with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
