import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
