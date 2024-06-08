import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Auth0Service } from '../auth0/auth0.service';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private auth0Service: Auth0Service, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.auth0Service.getToken();
    request.auth0Token = token;
    return true;
  }
}
