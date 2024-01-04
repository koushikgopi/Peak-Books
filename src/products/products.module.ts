import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Organization } from 'src/typeorm/entities/Organization';
import { ProductTax } from 'src/typeorm/entities/ProductTax';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Organization, ProductTax])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
