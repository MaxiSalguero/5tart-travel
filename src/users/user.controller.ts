import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('favorite')
  getFavorites() {
    return this.usersService.getFavorites();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Put('profile/:id')
  updatedProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updatedProfile(id, user);
  }

  @Post(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('active/:id')
  activeUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.activeUsers(id);
  }

  @UseGuards(AuthGuard)
  @Post('shelter/favorite/:id')
  addShelterFavorite(
    @Param('id', ParseUUIDPipe) shelterId: string,
    @Req() request,
  ) {
    const userId = request.user.id

    return this.usersService.addShelterFavorite(shelterId, userId);
  }

  @UseGuards(AuthGuard)
  @Post('pet/favorite/:id')
  addPetFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userId = request.user.id;
    return this.usersService.addPetFavorite(id, userId);
  }

  @UseGuards(AuthGuard)
  @Put('pet/favorite/:id')
  PutPetFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userId = request.user.id;

    return this.usersService.PutPetFavorite(id, userId);
  }

  @UseGuards(AuthGuard)
  @Put('shelter/favorite/:id')
  PutShelterFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userId = request.user.id;

    return this.usersService.PutShelterFavorite(id, userId);
  }
}
