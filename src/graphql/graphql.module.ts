import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseService } from 'src/database/database.service';
import { UserResolver } from 'src/user/user.resolver';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
  ],
  controllers: [],
  // TODO: why can't we just import: [ UserModule, ... ] aboce instead of including the UserService and DatabaseService here?
  providers: [UserResolver, UserService, DatabaseService],
})
export class GQLModule {}
