import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BrandModule } from '@Modules/brand/brand.module';
import { CategoryModule } from '@Modules/category/category.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from '@Model/Product/product.schema';
import { ProductRipo } from '@Model/Product/product.ripo';
import { ProductFactory } from './Factory';
import { UserMongooseModule } from '@Shared/UserMongooseModules';

@Module({
  imports:[
    UserMongooseModule,
    MongooseModule.forFeature([
      {name:Product.name , schema:productSchema}
    ]),
    BrandModule,
    CategoryModule
  ],
  controllers: [ProductController],
  providers: [ProductService , ProductRipo , ProductFactory ],
  exports: [ProductService , ProductRipo , ProductFactory ],
})
export class ProductModule {}
