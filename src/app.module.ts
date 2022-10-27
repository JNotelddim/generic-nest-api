import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GQLModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, GQLModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
