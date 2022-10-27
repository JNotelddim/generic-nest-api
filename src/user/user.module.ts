import { Module } from '@nestjs/common';
import { UsersController } from 'src/user/user.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
