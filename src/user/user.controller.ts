import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { FirebaseGuard } from 'src/auth/firebase/firebase.guard';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @UseGuards(FirebaseGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
