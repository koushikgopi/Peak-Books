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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateAccountDto } from 'src/accounts/dtos/createAccount.dto';
import { UpdateAccountDto } from 'src/accounts/dtos/updateAccount.dto';
import { AccountsService } from 'src/accounts/services/accounts/accounts.service';
import { Account } from 'src/typeorm/entities/Account';
import { Organization } from 'src/typeorm/entities/Organization';

@ApiTags('Account')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  @ApiOkResponse({
    description: 'To get account object as response',
    type: Account,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a account as a response',
  })
  async getAccounts(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Account>> {
    const result = await this.accountsService.findAll(query);
    if (result.data.length === 0) {
      throw new HttpException(
        ` No data found in Accounts `,
        HttpStatus.NO_CONTENT,
      );
    } else if (result.data.length > 0) {
      return result;
    } else {
      throw new HttpException(
        'Account Data not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'To get specific account object as response',
    type: Account,
  })
  @ApiBadRequestResponse({
    description: 'Not able to get a account object for a given id',
  })
  async getAccountById(@Param('id', ParseIntPipe) id: number) {
    const organization = await this.accountsService.getAccountById(id);
    if (organization) {
      return organization;
    } else {
      throw new HttpException(
        'Account object for a given id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'To create account object as response',
    type: CreateAccountDto,
  })
  @ApiBadRequestResponse({
    description: 'Not able to create a account as a response',
  })
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    const result = await this.accountsService.createAccount(createAccountDto);
    if (result) {
      return {
        msg: 'Account successfully created',
        result: result,
      };
    } else {
      throw new HttpException(
        'Not able to create a account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'To update account object as response',
    type: UpdateAccountDto,
  })
  @ApiBadRequestResponse({
    description: 'not able to update a account as a response',
  })
  async updateAccountById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDetails: UpdateAccountDto,
  ) {
    const organization = await this.accountsService.getAccountById(id);

    if (organization) {
      const result = await this.accountsService.updateAccount(
        id,
        updateAccountDetails,
      );
      if (result) {
        return {
          msg: 'Account data successfully updated',

          result: result,
        };
      }
    } else {
      throw new HttpException(
        'Not able to update a account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Account data successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Not able to delete a account data',
  })
  async deleteAccountById(@Param('id', ParseIntPipe) id: number) {
    const accountData = await this.getAccountById(id);
    if (accountData) {
      const result = await this.accountsService.deleteAccount(id);
      return {
        msg: `Account data deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Not able to delete a account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
