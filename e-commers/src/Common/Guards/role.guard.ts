

import { Roles } from '@Common/Decorator/roles.decorator';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    
    const request = context.switchToHttp().getRequest()
    const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()])
    const PublicVal = this.reflector.get('PUBLIC', context.getHandler())
    if (PublicVal) return true;
    if (!roles.includes(request.user.role))
      throw new UnauthorizedException("not allowed")
    return true

  }
}
