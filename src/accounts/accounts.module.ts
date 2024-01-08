import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts/accounts.controller';
import { AccountsService } from './services/accounts/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/typeorm/entities/Organization';
import { Account } from 'src/typeorm/entities/Account';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
