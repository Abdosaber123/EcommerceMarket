
import { UserRipo } from '@Model/index';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRipo: UserRipo,
    private readonly reflector: Reflector

  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const publicVal = this.reflector.get("PUBLIC", context.getHandler())
      if (publicVal) return true;
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      const payload = this.jwtService.verify<{ _id: string, email: string, role: string }>(authorization, { secret: this.configService.get("Access").JWB_SECRET })
      const userExist = await this.userRipo.get({ _id: payload._id })
      if (!userExist) throw new NotFoundException("User Not Found");
      request.user = userExist;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid Token");
    }


  }


}
