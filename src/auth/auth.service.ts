import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { FirebaseError } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  deleteUser,
  UserCredential,
} from 'firebase/auth';
import { DatabaseService } from 'src/database/database.service';
import {
  BadDeleteInputError,
  EmailAddressAlreadyTakenError,
  InvalidCredentialsError,
  InvalidEmailAddressError,
  UsernameAlreadyTakenError,
  WeakPasswordError,
} from 'src/error/auth.errors';
import { UnknownError } from 'src/error/error-classes';
import { UserService } from 'src/user/user.service';
import {
  DeleteAccountData,
  DeleteResponse,
  LoginResponse,
  RegisterData,
  SignupResponse,
  UserWithTokens,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
  ) {}

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
      throw new UnknownError();
    }

    if (!jwt) {
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
      throw new UnknownError();
    }
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Ensure the client receives the appropriate tokens.
    return this.getTokens(auth, user);
  }

  /**
   * Helper function to facilitate the Firebase Auth entry creation for
   * new user credentials.
   */
  private async createFirebaseAccount(
    auth: Auth,
    email: string,
    password: string,
  ) {
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
          case 'auth/invalid-email':
            throw new InvalidEmailAddressError();
          case 'auth/weak-password':
            throw new WeakPasswordError();
          default:
            throw new UnknownError();
        }
      }
      throw new UnknownError();
    }

    if (!userCredential.user) {
      throw new UnknownError();
    }

    return userCredential;
  }

  /**
   * Attempt to register a new user given form submission.
   * @param body
   * @returns
   */
  async signup(body: RegisterData): Promise<SignupResponse> {
    const { email, username, password, firstName, lastName, timezone } = body;

    // Prevent duplicates - there are unique constraints on certain fields.
    let userExists = this.userService.checkIfUserExists({ email });
    if (userExists) {
      throw new EmailAddressAlreadyTakenError();
    }
    userExists = this.userService.checkIfUserExists({ username });
    if (userExists) {
      throw new UsernameAlreadyTakenError();
    }

    // Proceed with creation now that credentials are verified to not be in use.
    const auth = getAuth();
    const userCredential = await this.createFirebaseAccount(
      auth,
      email,
      password,
    );

    // Create a database entry in our Users table now that the associated Firebase entry exists.
    let user: User;
    try {
      user = await this.userService.createUser({
        id: randomUUID(),
        firebaseUid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName,
        lastName,
        timezone,
        username,
      });
    } catch (err) {
      throw new UnknownError();
    }

    // Ensure the client receives the appropriate tokens.
    return await this.getTokens(auth, user);
  }

  // TODO: finish - needs User object
  async deleteAccount(body: DeleteAccountData): Promise<DeleteResponse> {
    const { id, email, firebaseUid } = body;

    // We can't delete a user that doesn't exist.
    const userExists = await this.userService.checkIfUserExists({
      email,
      id,
      firebaseUid,
    });
    if (!userExists) {
      throw new BadDeleteInputError();
    }

    // TODO: where to get the user credentials from?
    try {
      // deleteUser(user)
    } catch (e) {
      throw new InvalidCredentialsError();
    }

    try {
      await this.userService.deleteUser({ id });
    } catch (e) {
      throw new UnknownError();
    }

    return {
      success: true,
    };
  }
}
