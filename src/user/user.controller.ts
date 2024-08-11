import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserServices } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/DTOS/CreateUser.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { GlobalGuard } from 'src/guards/global.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(GlobalGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  // User Methods
  @Roles(Role.User)
  @Post('tour/favorite/:id')
  addTourFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user.id;
    return this.userService.addTourFavorite(id, userId);
  }

  @Roles(Role.User)
  @Put('profile')
  updatedProfile(@Body() user: UpdateUserDto, @Req() request: RequestWithUser) {
    const id = request.user.id;
    return this.userService.updatedProfile(id, user);
  }

  @Roles(Role.User)
  @Delete('tour/favorite/:id')
  deleteTourFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user.id;
    return this.userService.deleteTourFavorite(id, userId);
  }

  // Admin Methods
  @Roles(Role.Admin)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Roles(Role.Admin)
  @Get('disable/seen')
  getSeenUser() {
    return this.userService.getSeenUser();
  }

  @Roles(Role.Admin)
  @Put('active/:id')
  activeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.activeUser(id);
  }

  @Roles(Role.Admin)
  @Put('disable/:id')
  disableUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.disableUser(id);
  }

  @Roles(Role.Admin)
  @Put('seen/:id')
  putSeenUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.putSeenUser(id);
  }

  @Roles(Role.Admin)
  @Put('admin/:id')
  adminUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.adminUser(id);
  }

  @Roles(Role.Admin)
  @Delete('delete')
  deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
