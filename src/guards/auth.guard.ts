import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
     
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token)
      throw new UnauthorizedException('No se encontro el Bearer token');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      user.iat = new Date(user.iat * 1000);
      user.exp = new Date(user.exp * 1000);
      user.roles = user.role
      request.user = user;

      return true
    } catch (error) {
      throw new UnauthorizedException('Token Invalido');
    }
  }
}
