import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.db.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.user
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      .then((users) =>
        users.map(({ id, email, username, firstName, lastName }) => ({
          id,
          email,
          username,
          firstName,
          lastName,
        })),
      );
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  // TODO: delete this or properly integrate it with firebase and use it in AuthModule
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({
      where,
    });
  }

  /**
   * Util function for verifying whether or not a user already exists
   */
  async checkIfUserExists(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<boolean> {
    const users = await this.db.user.findMany({
      where,
    });

    return users !== undefined && users.length !== 0;
  }
}
