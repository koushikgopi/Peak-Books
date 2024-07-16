import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthChangePasswordUserDto } from 'src/auth/dtos/authChangePassword.dto';
import { AuthConfirmPasswordUserDto } from 'src/auth/dtos/authConfirmPassword.dto';
import { AuthForgotPasswordUserDto } from 'src/auth/dtos/authForgotPassword.dto';
import { AuthenticateRequestDto } from 'src/auth/dtos/authenticateRequest.dto';
import { CreateAuthUserDto } from 'src/auth/dtos/createAuthUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Get('/ToCheckExistingUsername')
  @ApiOkResponse({
    description: 'To Check Existing Username',
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  async toCheckUsername(@Query('username') username: string) {
    const result = await this.authService.checkExistingUsername(username);
    if (result) {
      return result;
    } else {
      throw new HttpException('user data not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signUp')
  @ApiCreatedResponse({
    description: 'To create user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Not able to create a user as a response',
  })
  async createUserProfile(@Body() userData: CreateAuthUserDto) {
    const result = await this.authService.createUserProfile(userData);
    if (result) {
      return {
        msg: 'User created Successfully',
        result: result,
      };
    } else {
      throw new HttpException(
        'Unable to create user data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('authenticate')
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'To authenticate username and password',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'UMRAdmin' },
          password: { type: 'string', example: 'Password@123' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  @UsePipes(new ValidationPipe())
  async authenticate(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      let finalData = [];
      const data = await this.authService.authenticate(authenticateRequest);
      const userDetails = await this.userRepository.findOne({
        where: { username: authenticateRequest.username },
        relations: ['role', 'organization'],
      });
      const loginDetails = {
        orgId: userDetails.organization.id,
        roleId: userDetails.role.id,
        userId: userDetails.id,
      };

      if (Number(loginDetails.roleId) === 3) {
        const userData = {
          id: userDetails.id,
          username: userDetails.username,
          firstname: userDetails.firstName,
          lastname: userDetails.lastName,
        };

        finalData.push({
          loginDetails: data,
          userDetail: loginDetails,
          customerDetails: userData,
        });
        return finalData;
      } else {
        finalData.push({
          loginDetails: data,
          userDetail: loginDetails,
        });
        return finalData;
      }
    } catch (e) {
      if (e.code === 'InvalidParameterException') {
        throw new BadRequestException(
          'the username does not match with the required credentials',
        );
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }

  @Post('/change-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        currentPassword: { type: 'string' },
        newPassword: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'To change the password',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'BLMAdmin@gmail.com' },
          currentPassword: { type: 'string', example: 'Password@123' },
          newPassword: { type: 'string', example: 'Password@123' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  @UsePipes(ValidationPipe)
  async changePassword(
    @Body() authChangePasswordUserDto: AuthChangePasswordUserDto,
  ) {
    try {
      const data = await this.authService.changeUserPassword(
        authChangePasswordUserDto,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/forgot-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'To change the password',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'UMRAdmin@gmail.com' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  @UsePipes(ValidationPipe)
  async forgotPassword(
    @Body() authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    return await this.authService.forgotUserPassword(authForgotPasswordUserDto);
  }

  @Post('/confirm-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        confirmationCode: { type: 'string' },
        newPassword: { type: 'string', example: 'Password@123' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Confirmation of password',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'UMRAdmin@gmail.com' },
          confirmationCode: { type: 'string', example: 'Password@123' },
          newPassword: { type: 'string', example: 'Password@123' },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  @UsePipes(ValidationPipe)
  async confirmPassword(
    @Body() authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    return await this.authService.confirmUserPassword(
      authConfirmPasswordUserDto,
    );
  }

  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'number' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated user for a given organization id',
  })
  @ApiBadRequestResponse({
    description: 'Not able to update user for a given organization id',
  })
  @Patch('addOrgToUser/:organizationId')
  async updateOrganizationWithUser(
    @Param('organizationId') organizationId: number,
    @Body('userId') userId: number,
  ) {
    /**
     * To check whether the user is updated for a given organization id
     */

    const result = await this.authService.updateOrganizationWithUser(
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
}
