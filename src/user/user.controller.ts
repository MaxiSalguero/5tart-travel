import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { request } from 'http';

@ApiTags('User')
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
}
