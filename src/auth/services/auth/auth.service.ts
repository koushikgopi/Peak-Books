import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthChangePasswordUserDto } from 'src/auth/dtos/authChangePassword.dto';
import { AuthConfirmPasswordUserDto } from 'src/auth/dtos/authConfirmPassword.dto';
import { AuthForgotPasswordUserDto } from 'src/auth/dtos/authForgotPassword.dto';
import { AuthenticateRequestDto } from 'src/auth/dtos/authenticateRequest.dto';
import { RegisterRequestDto } from 'src/auth/dtos/registerRequest.dto';
import { SigninRequestDto } from 'src/auth/dtos/signInRequest.dto';
import { Organization } from 'src/typeorm/entities/Organization';
import { Role } from 'src/typeorm/entities/Role';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateAuthUserType } from 'src/utils/types/auth';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private userService: UsersService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async signUp(registerRequest: SigninRequestDto) {
    try {
      const authRegisterRequest = {
        username: registerRequest.username,
        email: registerRequest.email,
        password: registerRequest.password,
        name: registerRequest.name,
        role: 'Admin',
      };
      const data: any = await this.register(authRegisterRequest);

      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(authRegisterRequest: RegisterRequestDto) {
    const { username, email, password, name, role } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: name }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }
  /**
   * user confirmation
   */
  confirmUser(user: { username: string; confirmationCode: string }) {
    const { username, confirmationCode } = user;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  async createUserProfile(userDetails: CreateAuthUserType) {
    try {
      /**
       * hardcoded roleId bcz this is only for admin signup
       */
      const roleData = await this.roleRepository.findOne({
        where: { id: 1 },
      });
      if (!roleData) {
        throw new BadRequestException('Role id not found');
      }
      const findName = await this.userRepository.findBy({
        username: userDetails.username,
      });

      /**
       * if the username exist, throw a error
       */
      if (findName.length != 0) {
        throw new ConflictException('Username already exists');
      }
      const newUser = this.userRepository.create({
        ...userDetails,
        role: roleData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      console.log(newUser);
      const result = await this.userRepository.save(newUser);
      const cognitoData = {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        name: userDetails.firstName + ' ' + userDetails.lastName,
      };
      await this.signUp(cognitoData);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * To authenticate username and password
   */
  async authenticate(user: AuthenticateRequestDto) {
    const { username, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   *updating organization for the user (for Admin alone at the initial signup process)
   */
  async updateOrganizationWithUser(organizationId: number, userId: number) {
    try {
      const newOrgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!newOrgData) {
        throw new BadRequestException('Organization id not found');
      }

      await this.userRepository.update(
        { id: userId },
        {
          organization: newOrgData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );

      return { ...newOrgData };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
 * To check whether the username already exists in database for the customer
   sign up 
*/
  async checkExistingUsername(username: string) {
    try {
      const findName = await this.userRepository.findBy({
        username: username,
      });

      /**
       * if the username exist, throw a error
       */

      if (findName.length != 0) {
        throw new ConflictException('Username already exists');
      }
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeUserPassword(
    authChangePasswordUserDto: AuthChangePasswordUserDto,
  ) {
    const { email, currentPassword, newPassword } = authChangePasswordUserDto;

    if (currentPassword === newPassword) {
      throw new Error(
        'New password must be different from the current password.',
      );
    }

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: currentPassword,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          userCognito.changePassword(
            currentPassword,
            newPassword,
            (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            },
          );
        },
        onFailure: (err) => {
          const customError = new Error(
            'Authentication failed. Please check your email and password.',
          );
          reject(customError);
        },
      });
    });
  }

  // forget Password

  async forgotUserPassword(
    authForgotPasswordUserDto: AuthForgotPasswordUserDto,
  ) {
    const { email } = authForgotPasswordUserDto;
    const mail = await this.userEmail(email);
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async userEmail(emailId: string) {
    const user = await this.userRepository.findOne({
      where: { email: emailId },
    });
    if (user) {
      return user;
    } else {
      throw new BadRequestException('EmailId not found');
    }
  }

  // forget password recreate the new password
  async confirmUserPassword(
    authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
  ) {
    const { email, confirmationCode, newPassword } = authConfirmPasswordUserDto;

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          resolve({ status: 'success' });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
