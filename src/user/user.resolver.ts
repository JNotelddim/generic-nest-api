import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, PartialUser } from 'src/graphql/models/user.model';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/auth/firebase/firebase.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(FirebaseGuard)
  @Query(() => User, { nullable: true })
  async userById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.user({ id });
  }

  @Query(() => [PartialUser])
  async users(): Promise<Array<Partial<User> | null>> {
    return await this.userService.users({});
  }
}
