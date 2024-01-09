import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Organization } from 'src/typeorm/entities/Organization';
import { Role } from 'src/typeorm/entities/Role';
import { User } from 'src/typeorm/entities/User';
import { CreateUserType, UpdateUserType } from 'src/utils/types/user';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private dataSource: DataSource,
  ) {}
  public async findAll(organizationId: number) {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      const users = await this.userRepository.find({
        where: { organization: orgData },
      });
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @param {number} id
   * @returns user object for a given id
   */
  async getUserById(id: number) {
    try {
      const data = await this.userRepository.findOne({
        where: { id: id },
        relations: ['role', 'organization'],
      });
      if (!data) {
        throw new BadRequestException('user id not found');
      }
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createUser(userDetails: CreateUserType) {
    try {
      const roleData = await this.roleRepository.findOne({
        where: { id: 1 },
      });
      if (!roleData) {
        throw new BadRequestException('Role id not found');
      }
      const orgData = await this.organizationRepository.findOne({
        where: { id: userDetails.organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }

      console.log(roleData);
      /**
       * check if there is same username
       */
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
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
        userStatus: 'pending',
        role: roleData,
        organization: orgData,
      });

      const data = await this.userRepository.save(newUser);
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: number, updateUserDetails: UpdateUserType) {
    try {
      const data = await this.userRepository.findOne({
        where: { id: id },
        relations: ['role', 'organization'],
      });
      const roleData = await this.roleRepository.findOne({
        where: { id: 1 },
      });
      if (!roleData) {
        throw new BadRequestException('Role id not found');
      }
      const orgData = await this.organizationRepository.findOne({
        where: { id: updateUserDetails.organization },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }

      await this.userRepository.update(
        { id },
        {
          ...updateUserDetails,
          updatedAt: new Date(),
          updatedBy: 'Admin',
          userStatus: 'completed',
          role: roleData,
          organization: orgData,
        },
      );

      const userData = await this.userRepository.findOne({
        where: { id },
        relations: ['role', 'organization'],
      });
      return { ...userData };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  /**
   * @param {number} id
   * To delete the user data by id
   */
  async deleteUser(id: number) {
    try {
      const data = await this.userRepository.findOne({
        where: { id: id },
        // relations: ['role', 'tester', 'organization'],
        relations: ['role', 'organization'],
      });

      // const result = await this.userRepository.delete({ id });
      // return result;
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This user is assigned ,cannot delete a user',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  // async updateOrganizationWithUser(organizationId: number, userId: string) {
  //   try {
  //     const newOrgData = await this.organizationRepository.find({
  //       where: { id: organizationId },
  //     });
  //     if (!newOrgData) {
  //       throw new BadRequestException('Organization id not found');
  //     }

  //     await this.userRepository.update(
  //       { id: +userId },
  //       {
  //         organization: newOrgData[0],
  //         updatedAt: new Date(),
  //         updatedBy: 'Admin',
  //       },
  //     );

  //     return { ...newOrgData };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
