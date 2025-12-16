import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthFactory } from './Factory.ts';
import { JwtService } from '@nestjs/jwt';
import { UserRipo } from '@Model/index';
import { UserMongooseModule } from '@Shared/UserMongooseModules';

@Module({
  imports:[UserMongooseModule],
  controllers: [AuthController],
  providers: [AuthService ,AuthFactory , JwtService  ],
})
export class AuthModule {}
