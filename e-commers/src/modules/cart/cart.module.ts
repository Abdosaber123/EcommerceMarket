import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRipo } from '@Model/Cart/cart.ripo';
import { JwtService } from '@nestjs/jwt';
import { UserMongooseModule } from '@Shared/UserMongooseModules';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '@Model/Cart/cart.schema';
import { ProductModule } from '@Modules/product/product.module';

@Module({
  imports:[
    UserMongooseModule,
    MongooseModule.forFeature([
      {name:Cart.name , schema:CartSchema}
    ]),
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService , CartRipo , JwtService],
  exports: [CartService , CartRipo , JwtService],
})
export class CartModule {}
