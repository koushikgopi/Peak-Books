import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Organization } from 'src/typeorm/entities/Organization';
import { Role } from 'src/typeorm/entities/Role';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, Role])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
