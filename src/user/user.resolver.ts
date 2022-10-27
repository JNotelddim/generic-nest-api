import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/graphql/models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async userById(@Args('id') id: string): Promise<User | null> {
    return await this.userService.user({ id });
  }

  @Query(() => [User])
  async users(): Promise<Array<User | null>> {
    return await this.userService.users({});
  }
}
