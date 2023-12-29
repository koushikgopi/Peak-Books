import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/typeorm/entities/Role';
import { BadRequestException } from '@nestjs/common';

import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { CreateRoleType, UpdateRoleType } from 'src/utils/types/role';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Role>> {
    try {
      const roles = paginate(query, this.roleRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['roleName', 'roleDescription'],
        defaultSortBy: [['id', 'DESC']],
        where: { isDelete: false },
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
      return roles;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getRoleById(id: number) {
    try {
      const data = await this.roleRepository.findOne({
        where: { id: id },
      });
      if (!data) {
        throw new BadRequestException('role id not found');
      }
      if (data.isDelete === false) {
        return data;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createRole(roleDetails: CreateRoleType) {
    try {
      const newRole = this.roleRepository.create({
        ...roleDetails,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const result = this.roleRepository.save(newRole);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @param {number} id
   * @returns Updated role data of a specified id
   */
  async updateRole(id: number, updateRoleDetails: UpdateRoleType) {
    try {
      const roleData = await this.roleRepository.findOne({
        where: { id: id },
      });
      if (roleData.isDelete === false) {
        await this.roleRepository.update(
          { id },
          {
            ...updateRoleDetails,
            updatedAt: new Date(),
            updatedBy: 'Admin',
          },
        );
        const data = await this.roleRepository.findOne({
          where: { id },
        });
        return { ...data };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * @param {number} id
   * To delete the role data by id
   */
  async deleteRole(id: number) {
    try {
      const data = await this.roleRepository.findOne({
        where: { id: id },
      });
      if (!data) {
        throw new BadRequestException('unable to find appointment');
      }
      if (data.isDelete === false) {
        await this.roleRepository.update(
          {
            id: id,
          },
          {
            isDelete: true,
            updatedAt: new Date(),
            updatedBy: 'Admin',
          },
        );
        // const result = await this.customerRepository.delete({ id });
        // return result;
      }
      // const data = await this.roleRepository.delete({ id });
      // return data;
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This role is assigned,cannot delete a role',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
