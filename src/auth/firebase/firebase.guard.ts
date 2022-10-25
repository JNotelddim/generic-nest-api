import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  InvalidCredentialsError,
  UnauthorizedError,
} from 'src/error/auth.errors';
import firebaseAdmin from 'firebase-admin';
import { BadRequestError } from 'src/error/error-classes';

// The parameter for `AuthGuard` must match the "name" of the authentication strategy.
// In this case, the authentication strategy name is "firebase", so here we must use the same name.

/**
 * FirebaseGuard is a Guard which can be attached onto endpoints to enforce
 * authentication on them. If an endpoint with this Guard is hit without the
 * necessary token, the request will fail.
 */
@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private readonly databaseService: DatabaseService) {}

  async canActivate(context: ExecutionContext) {
    console.log('FirebaseGuard - canActivate');

    // TODO: should it handle other cases?
    if (context.getType() !== 'http') {
      throw new BadRequestError('Incorrect request protocol.');
    }

    const { req } = context.getArgs()[1];

    const idToken = (req.headers.authorization || '').replace('Bearer ', '');

    let decodedIdToken: firebaseAdmin.auth.DecodedIdToken;
    try {
      decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken, true);
    } catch (err) {
      //   this.logger.error(err);
      throw new InvalidCredentialsError();
    }

    if (!decodedIdToken.email) {
      throw new UnauthorizedError('Unauthorized');
    }

    const user = await this.databaseService.user.findFirst({
      where: {
        email: decodedIdToken.email,
        firebaseUid: decodedIdToken.uid,
      },
    });

    if (!user) {
      //   this.logger.warn(
      //     `FirebaseGuard: Access denied to deleted <User ${user.id}>`,
      //   );
      throw new UnauthorizedError('Unauthorized');
    }

    req.user = user;

    return !!user;
  }
}
