import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/typeorm/entities/Organization';
import { Product } from 'src/typeorm/entities/Product';
import { ProductTax } from 'src/typeorm/entities/ProductTax';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Repository, DataSource } from 'typeorm';
import {
  CreateProductAndProductTaxType,
  UpdateProductAndProductTaxType,
} from 'src/utils/types/product';

@Injectable()
export class ProductsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(ProductTax)
    private productTaxRepository: Repository<ProductTax>,
  ) {}

  public async findAll(
    query: PaginateQuery,
    organizationId: number,
  ): Promise<Paginated<Product>> {
    try {
      const orgData = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!orgData) {
        throw new BadRequestException('Organization id not found');
      }

      const products = paginate(query, this.productRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['id'],
        defaultSortBy: [['id', 'DESC']],
        where: { organization: orgData },
        select: [],
        relations: ['productTax', 'organization'],
        filterableColumns: {
          id: [FilterOperator.GTE, FilterOperator.LTE],
        },
      });
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductById(id: number) {
    try {
      const data = await this.productRepository.findOne({
        where: { id: id },
        relations: ['productTax'],
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createProduct(productDetails: CreateProductAndProductTaxType) {
    let productTax;

    try {
      let product;
      const organizationData = await this.organizationRepository.findOne({
        where: { id: productDetails.productValue.organizationId },
      });
      if (!organizationData) {
        throw new BadRequestException('Organization id not found');
      }

      const newProduct = this.productRepository.create({
        ...productDetails.productValue,
        organization: organizationData,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Admin',
        updatedBy: 'Admin',
      });
      const result = await this.productRepository.save(newProduct);
      const newValue = productDetails.productTaxValue;
      productTax = productDetails.productTaxValue.map((element) => {
        return {
          taxType: element.taxType,
          taxPercentage: element.taxPercentage,
          isActive: element.isActive,
          createdAt: new Date(),
          createdBy: 'Admin',
          updatedAt: new Date(),
          updatedBy: 'Admin',
          invoice: newProduct,
        };
      });
      const data1 = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ProductTax)
        .values(productTax)
        .execute();
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateProduct(
    id: number,
    updateProductDetails: UpdateProductAndProductTaxType,
  ) {
    try {
      const organizationData = await this.organizationRepository.findOne({
        where: { id: updateProductDetails.productValue.organization },
      });

      if (!organizationData) {
        throw new BadRequestException('Organization id not found');
      }
      await this.productRepository.update(
        { id },
        {
          ...updateProductDetails.productValue,
          organization: organizationData,
          updatedAt: new Date(),
          updatedBy: 'Admin',
        },
      );

      for (let i = 0; i < updateProductDetails.productTaxValue.length; i++) {
        if (updateProductDetails.productTaxValue[i].id === 0) {
          const productData = await this.productRepository.findOne({
            where: { id: id },
          });
          if (!productData) {
            throw new BadRequestException('Product Data not found');
          }

          const productTAxData = await this.productTaxRepository.create({
            ...updateProductDetails.productTaxValue[i],
            product: productData,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'Admin',
            updatedBy: 'Admin',
          });
          const newProductTax = await this.productTaxRepository.save(
            productTAxData,
          );
        } else {
          const productData = await this.productRepository.findOne({
            where: { id: id },
          });
          if (!productData) {
            throw new BadRequestException('Product Data not found');
          }
          await this.productTaxRepository.update(
            { id: updateProductDetails.productTaxValue[i].id },
            {
              ...updateProductDetails.productTaxValue[i],
              product: productData,
              updatedAt: new Date(),
              updatedBy: 'Admin',
            },
          );
        }
      }

      const data = await this.productRepository.findOne({
        where: { id },
        relations: ['productTax'],
      });
      return { ...data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProduct(id: number) {
    try {
      const productData = await this.productRepository.findOne({
        where: { id: id },
        relations: ['productTax'],
      });
      if (!productData) {
        throw new BadRequestException('Product data not found');
      }
      if (productData) {
        for (let i = 0; i < productData.productTax.length; i++) {
          const result = await this.productTaxRepository.delete(
            productData.productTax[i].id,
          );
        }
      }
      const data = await this.productRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
