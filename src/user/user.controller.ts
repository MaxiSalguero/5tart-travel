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

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  // User Methods
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @Post('tour/favorite/:id')
  addTourFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const userId = request.user.id;
    return this.userService.addTourFavorite(id, userId);
  }

  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @Put('profile')
  updatedProfile(@Body() user: UpdateUserDto, @Req() request: RequestWithUser) {
    const id = request.user.id;
    return this.userService.updatedProfile(id, user);
  }

  @Roles(Role.User)
  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
  @UseGuards(RolesGuard)
  @Get('disable/seen')
  getSeenUser() {
    return this.userService.getSeenUser();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put('active/:id')
  activeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.activeUser(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put('disable/:id')
  disableUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.disableUser(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put('seen/:id')
  putSeenUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.putSeenUser(id);
  }

  //@Roles(Role.Admin)
  @Put('admin/:id')
  adminUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.adminUser(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete('delete')
  deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
