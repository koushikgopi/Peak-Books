import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Account } from 'src/typeorm/entities/Account';
import { Organization } from 'src/typeorm/entities/Organization';
import { CreateAccountType, UpdateAccountType } from 'src/utils/types/account';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Account>> {
    try {
      return paginate(query, this.accountRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['accountHolderName', 'bankName'],
        defaultSortBy: [['id', 'DESC']],
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAccountById(id: number) {
    try {
      const data = await this.accountRepository.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAccount(accountDetails: CreateAccountType) {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: accountDetails.organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      const newAccount = await this.accountRepository.create({
        ...accountDetails,
        organization: orgData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const accountData = await this.accountRepository.save(newAccount);
      return accountData;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateAccount(id: number, updateAccountDetails: UpdateAccountType) {
    try {
      const accountData = await this.accountRepository.findOne({
        where: { id: id },
      });
      if (!accountData) {
        throw new BadRequestException('Account id not found');
      }

      const orgData = await this.organizationRepository.findOne({
        where: { id: updateAccountDetails.organization },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }
      await this.accountRepository.update(
        { id },
        {
          ...updateAccountDetails,
          organization: orgData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );
      const updatedAccount = await this.accountRepository.findOne({
        where: { id },
      });

      return { ...updatedAccount };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAccount(id: number) {
    try {
      const data = await this.accountRepository.findOne({
        where: { id: id },
      });
      if (data) {
        const acctData = await this.accountRepository.delete(id);
      }
    } catch (err) {
      if (err.errno === 1451) {
        throw new BadRequestException(
          'This account is assigned,cannot delete a organization',
        );
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
