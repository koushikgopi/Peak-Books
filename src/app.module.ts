import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './typeorm/entities/Role';
import { Customer } from './typeorm/entities/Customer';
import { Organization } from './typeorm/entities/Organization';
import { User } from './typeorm/entities/User';
import { Vehicle } from './typeorm/entities/Vehicle';
import { Invoice } from './typeorm/entities/Invoice';
import { LineItem } from './typeorm/entities/LineItem';
import { Product } from './typeorm/entities/Product';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',

      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SQL_HOST,
      port: 3306,
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      entities: [
        Role,
        Customer,
        Organization,
        User,
        Vehicle,
        Invoice,
        LineItem,
        Product,
      ],
      synchronize: false,
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
