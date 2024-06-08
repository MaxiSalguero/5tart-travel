import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwksRsa from 'jwks-rsa';
import { promisify } from 'util';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private client: jwksRsa.JwksClient;
  private jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
    this.client = jwksRsa({
      jwksUri: `https://dev-r34ulqlg6mkaafee.us.auth0.com/.well-known/jwks.json`,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('No se encontró el Bearer token');
    }

    try {    
      const decodedToken = await this.verifyToken(token);
      decodedToken.iatDate = new Date(decodedToken.iat * 1000).toISOString();
      decodedToken.expDate = new Date(decodedToken.exp * 1000).toISOString();
      request.user = decodedToken

      console.log(request.user);

      /* const userRoles = decodedToken['https://huellasdesperanza.com/roles']; */

/*       if (!this.hasRequiredRole(userRoles, ['Admin'])) {
        throw new ForbiddenException('No tienes los permisos necesarios');
      } */

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new UnauthorizedException('Token inválido');
      }
    }
  }

  private async getKey(header, callback) {
    this.client.getSigningKey(header.kid, function (err, key) {
      if (err) {
        callback(err, null);
      } else {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  }

  private async verifyToken(token: string): Promise<JwtPayload> {
    const getSigningKey = promisify(this.getKey.bind(this));
    const decodedToken = this.jwtService.decode(token, {
      complete: true,
    }) as any;

    if (!decodedToken || !decodedToken.header) {
      throw new UnauthorizedException('Token inválido');
    }

    const signingKey = await getSigningKey(decodedToken.header);

    return this.jwtService.verify(token, {
      algorithms: ['RS256'],
      secret: signingKey,
      issuer: `https://dev-r34ulqlg6mkaafee.us.auth0.com/`,
      audience: 'https://dev-r34ulqlg6mkaafee.us.auth0.com/api/v2/',
    });
  }

  private hasRequiredRole(
    userRoles: string[],
    requiredRoles: string[],
  ): boolean {
    return requiredRoles.every((role) => userRoles.includes(role));
  }
}
