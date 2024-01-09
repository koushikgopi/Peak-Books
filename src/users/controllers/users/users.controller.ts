import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  /**
   * @returns user data
   */
  @Get()
  @ApiOkResponse({
    description: 'to get user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'not able to get a user as a response',
  })
  getUsers(
    @Paginate() query: PaginateQuery,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<Paginated<User>> {
    const result = this.userService.findAll(query, organizationId);
    if (result) {
      return result;
    } else {
      throw new HttpException('User  not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'to get specific user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'not able to get a user as a response',
  })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    /**
     *This is to check if we got the user object or not
     */
    const result = await this.userService.getUserById(id);
    if (result) {
      return result;
    } else {
      throw new HttpException('User not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'to create user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'not able to create a user as a response',
  })
  async createUser(@Body() userData: CreateUserDto) {
    const result = await this.userService.createUser(userData);
    if (result) {
      return {
        msg: 'User created Successfully',
        result: result,
      };
    } else {
      throw new HttpException(
        'unable to create user data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'to update user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'not able to update a organization as a response',
  })
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    /**
     * This is to check if we update the User object using id or not
     */
    const user = await this.userService.getUserById(id);

    if (user) {
      const result = await this.userService.updateUser(id, updateUserDto);

      if (result) {
        return {
          msg: `User Object ${user.username} Successfully Updated`,
          result: result,
        };
      }
    } else {
      throw new HttpException(
        'User Object with specific Id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiBody({
    schema: {
      properties: {
        utility: { type: '' },
        userId: { type: '' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated utility for a given organization id',
  })
  @ApiBadRequestResponse({
    description: 'Not able to update utility for a given organization id',
  })
  @Patch('addOrgToUser/:organizationId')
  async updateOrganizationWithUtility(
    @Param('organizationId') organizationId: number,
    @Body('userId') userId: string,
  ) {
    /**
     * To check whether the utility is updated for a given organization id
     */

    const result = await this.userService.updateOrganizationWithUser(
      organizationId,
      userId,
    );

    if (result) {
      return {
        msg: 'Updated successfully',
        result: result,
      };
    } else {
      throw new HttpException('Unable to update', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'user data successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'not able to delete a user as a response',
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    /**
     * This is to check if we delete the user object or not
     */
    const user = await this.userService.getUserById(id);
    if (user) {
      const result = await this.userService.deleteUser(id);
      return {
        msg: `User Object ${user.username} deleted successfully`,
      };
    } else {
      throw new HttpException(
        `User data with a specific Id not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
