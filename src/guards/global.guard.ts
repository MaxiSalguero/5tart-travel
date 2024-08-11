import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(
    private authGuard: AuthGuard,
    private rolesGuard: RolesGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    if (
      // Excluir rutas en UserController
      (url.match(/^\/user\/admin\/[^/]+$/) && method === 'PUT') || // PUT user/admin/:id
      (url === '/user' && method === 'GET') ||
      (url.match(/^\/user\/[^/]+$/) && method === 'GET') || // GET /user/:id
      // Excluir rutas en TourController (Other Methods)
      (url === '/tours' && method === 'GET') ||
      (url === '/tours/bus' && method === 'GET') ||
      (url === '/tours/plane' && method === 'GET') ||
      (url === '/tours/oferta' && method === 'GET') ||
      (url.match(/^\/tours\/[^/]+$/) && method === 'GET') || // GET /tours/:id
      (url === '/tours/mailOfertas' && method === 'POST') ||
      // Excluir rutas en OrderController
      (url === '/order' && method === 'GET') ||
      // Excluir rutas en ContactController
      (url === '/contact' && method === 'POST') ||
      // Excluir rutas en AgencyController
      (url === '/agency' && method === 'GET') ||
      (url === '/agency/disable' && method === 'GET') ||
      (url === '/agency/disable/seen' && method === 'GET') ||
      (url.match(
        /^\/agency\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      ) &&
        method === 'GET') || // GET /agency/:id
      (url.match(/^\/agency\/disable\/seen\/[^/]+$/) && method === 'PUT') || // PUT /agency/disable/seen/:id
      (url.match(/^\/agency\/[^/]+$/) && method === 'DELETE') // DELETE /agency/:id
    ) {
      return true; // Permite acceso sin aplicar ningún guard
    }

    const authResult = await this.authGuard.canActivate(context);
    if (!authResult) {
      return false;
    }

    return this.rolesGuard.canActivate(context);
  }
}
