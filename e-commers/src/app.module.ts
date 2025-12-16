import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './Config/dev.config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { BrandModule } from 'src/modules/brand/brand.module';
import { ProductModule } from 'src/modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({load:[devConfig],isGlobal:true}),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      uri:configService.get('db').url
    })
    }),
    AuthModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
