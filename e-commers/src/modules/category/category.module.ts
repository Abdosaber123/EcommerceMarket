import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRipo } from '@Model/Category/Category.Ripo';
import { CategoryFactory } from './Factory';
import { UserMongooseModule } from '@Shared/UserMongooseModules';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from '@Model/Category/Category.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[
    UserMongooseModule,
    MongooseModule.forFeature([
      {name:Category.name , schema:categorySchema}])
  ],
  controllers: [CategoryController],
  providers: [CategoryService , CategoryRipo , CategoryFactory , JwtService],
  exports: [CategoryService , CategoryRipo , CategoryFactory , JwtService],
})
export class CategoryModule {}
