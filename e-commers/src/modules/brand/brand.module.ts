import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFecroty } from './Factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongooseModule } from '@Shared/UserMongooseModules';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from '@Model/Brand/brand.schema';
import { BrandRipo } from '@Model/Brand/brand.ripo';

@Module({
  imports:[
    UserMongooseModule,
    MongooseModule.forFeature([
      {name:Brand.name , schema:brandSchema}
    ])
  ],
  controllers: [BrandController],
  providers: [BrandService , BrandFecroty , JwtService , BrandRipo],
  exports: [BrandService , BrandFecroty , JwtService , BrandRipo],
})
export class BrandModule {}
