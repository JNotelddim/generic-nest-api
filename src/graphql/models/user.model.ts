import { Field, ID, ObjectType, PartialType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firebaseUid: string;
  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  timezone: string;
}

export class PartialUser extends PartialType(User) {}
