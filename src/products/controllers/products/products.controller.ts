import {
  BadRequestException,
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
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateProductAndProductTaxDto } from 'src/products/dtos/createProduct.dto';
import { UpdateProductAndProductTaxDto } from 'src/products/dtos/updateProduct.dto';
import { ProductsService } from 'src/products/services/products/products.service';
import { Product } from 'src/typeorm/entities/Product';
@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  @ApiOkResponse({
    description: 'product data',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  /**
   *  To fetch the product data
   */
  async getProducts(
    @Paginate() query: PaginateQuery,
    @Query('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<Paginated<Product>> {
    const result = await this.productService.findAll(query, organizationId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Product  not found ', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Product data for a particular id',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Product data with a specified Id not found',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To check if we got the product data with a specified Id or not
     */
    const product = await this.productService.getProductById(id);
    if (product) {
      return product;
    } else {
      throw new HttpException(
        'Product data with a specified Id not found ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created product object as response',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Not found',
  })
  async createProduct(@Body() createProductDto: CreateProductAndProductTaxDto) {
    /**
     * To know whether the product data is created or not
     */
    const result = await this.productService.createProduct(createProductDto);
    if (result) {
      return { msg: 'Product data created successfully', result: result };
    } else {
      throw new HttpException(
        'Unable to create product data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Updated Product data ',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Product data with a specified Id not found',
  })
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductAndProductTaxDto,
  ) {
    /**
     * To know whether the product data with specified Id is updated or not
     */
    const product = await this.productService.getProductById(id);
    if (product) {
      const data = await this.productService.updateProduct(
        id,
        updateProductDto,
      );
      if (data)
        return {
          message: `Product data with ${product} Successfully Updated`,
          result: data,
        };
    } else {
      throw new HttpException(
        'Product data with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Product data deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Product data with a specified Id not found',
  })
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    /**
     * To know whether the specified Id - product data is deleted or not
     */
    const product = await this.productService.getProductById(id);
    if (product) {
      await this.productService.deleteProduct(id);
      return {
        msg: `Product data with ${product.itemName} deleted successfully`,
      };
    } else {
      throw new HttpException(
        'Product data with a specified Id not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
