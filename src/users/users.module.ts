import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Role } from 'src/typeorm/entities/Role';
import { Organization } from 'src/typeorm/entities/Organization';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Organization])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
