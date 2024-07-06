import {
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
import { request } from 'http';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('user')
@Controller('user')
export class userController {
  constructor(private userService: UserServices) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    // console.log(request.user.id);

    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('tour/favorite/:id')
  addTourFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userId = request.user.id;

    return this.userService.addTourFavorite(id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('tour/favorite/:id')
  deleteTourFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userId = request.user.id;

    return this.userService.deleteTourFavorite(id, userId);
  }

  @Put('active/:id')
  activeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.activeUser(id);
  }

  @Put('disable/:id')
  disableUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.disableUser(id);
  }
}
