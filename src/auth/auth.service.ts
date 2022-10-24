import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { FirebaseError } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { DatabaseService } from 'src/database/database.service';
import {
  EmailAddressAlreadyTakenError,
  InvalidCredentialsError,
  InvalidEmailAddressError,
  UsernameAlreadyTakenError,
  WeakPasswordError,
} from 'src/error/auth.errors';
import { UnknownError } from 'src/error/error-classes';
import {
  LoginResponse,
  RegisterData,
  SignupResponse,
  UserWithTokens,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  // TODO:
  // - get tokens
  // - forgot password (sends link)
  // - reset password (making the actual change)
  // - refresh token
  // - delete user

  /**
   * Generate a JWT and get the refresh token for this user
   * @param auth Firebase auth instance
   * @param user The current user object
   * @private
   */
  private async getTokens(auth: Auth, user: User): Promise<UserWithTokens> {
    let jwt: string;
    let refreshToken: string;

    try {
      jwt = await auth.currentUser.getIdToken();
      refreshToken = auth.currentUser.refreshToken;
    } catch (err) {
      //   this.logger.error(`Error creating a JWT for user email ${user.email}`);
      //   this.logger.error(err);
      throw new UnknownError();
    }

    if (!jwt) {
      //   this.logger.error(`Error creating a JWT for user email ${user.email}`);
      throw new UnknownError();
    }

    return {
      user,
      jwt,
      refreshToken,
    };
  }

  /**
   * Attempt to authenticate a user based on credentials provided.
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const auth = getAuth();

    let userCredential: UserCredential;

    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            console.error('Invalid Email Address');
          case 'auth/user-not-found':
          case 'auth/user-disabled':
          case 'auth/wrong-password':
            console.error('Invalid Credentials');
          default:
            console.error(
              `Error authenticating Firebase user with email ${email}`,
            );
        }
      }
    }

    let user: User;

    try {
      user = await this.databaseService.user.findFirst({
        where: {
          email,
          firebaseUid: userCredential.user.uid,
        },
      });
    } catch (err) {
      //    this.logger.error(err);
      throw new UnknownError();
    }

    if (!user) {
      //    this.logger.warn(
      //      `User with email ${email} present in firebase but not in database`,
      //    );
      throw new InvalidCredentialsError();
    }

    // TODO: create JWT, return token.
    return this.getTokens(auth, user);
  }

  /**
   * Attempt to register a new user given form submission.
   * @param body
   * @returns
   */
  async signup(body: RegisterData): Promise<SignupResponse> {
    const { email, username, password, firstName, lastName, timezone } = body;

    let existingUser = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new EmailAddressAlreadyTakenError();
    }

    if (username) {
      existingUser = await this.databaseService.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        throw new UsernameAlreadyTakenError();
      }
    }

    const auth = getAuth();

    let userCredential: UserCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            //  this.logger.warn(
            //    `User with email ${email} present in firebase but not in database`,
            //  );
            throw new EmailAddressAlreadyTakenError();
          case 'auth/invalid-email':
            throw new InvalidEmailAddressError();
          case 'auth/weak-password':
            throw new WeakPasswordError();
          default:
            // this.logger.error(
            //   `Error creating Firebase user with email ${email}`,
            // );
            // this.logger.error(err);
            throw new UnknownError();
        }
      }
      //    this.logger.error(`Error creating Firebase user with email ${email}`);
      //    this.logger.error(err);
      throw new UnknownError();
    }

    if (!userCredential.user) {
      //   this.logger.error(
      //     `Something went wrong registering user ${email}: ${JSON.stringify(
      //       userCredential,
      //     )}`,
      //   );
      throw new UnknownError();
    }

    let user: User;

    try {
      user = await this.databaseService.user.create({
        data: {
          id: randomUUID(),
          firebaseUid: userCredential.user.uid,
          email: userCredential.user.email,
          firstName,
          lastName,
          timezone,
          username,
        },
      });
    } catch (err) {
      //    this.logger.error(`Error creating user db entity with email ${email}`);
      //    this.logger.error(err);
      throw new UnknownError();
    }

    return await this.getTokens(auth, user);
  }
}
