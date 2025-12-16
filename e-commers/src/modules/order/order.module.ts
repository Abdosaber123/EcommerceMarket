import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserMongooseModule } from '@Shared/UserMongooseModules';
import { ProductModule } from '@Modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderRipo, orderSchema } from '@Model/index';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from '@Modules/cart/cart.module';

@Module({
  imports:[
    UserMongooseModule,
    ProductModule,
    CartModule,
    MongooseModule.forFeature([
      {name:Order.name , schema:orderSchema}
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService , OrderRipo , JwtService ],
})
export class OrderModule {}
