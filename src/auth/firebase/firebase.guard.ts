import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
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
    console.log({ type: context.getType() });
    let req;

    // get Req value
    switch (context.getType()) {
      case 'http':
        req = context.getArgs()[1].req;
        break;

      // TODO: why isn't graphql valid?
      case 'graphql' as unknown as ContextType:
        req = context.getArgs()[2].req;
        break;

      default:
        throw new BadRequestError('Incorrect request protocol.');
    }

    // Gather token from Auth header and try to decode it.
    const idToken = (req.headers.authorization || '').replace('Bearer ', '');
    let decodedIdToken: firebaseAdmin.auth.DecodedIdToken;
    try {
      decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken, true);
    } catch (err) {
      throw new InvalidCredentialsError();
    }

    if (!decodedIdToken.email) {
      throw new UnauthorizedError('Unauthorized');
    }

    // Ensure there's a db user matching the firebase credentials.
    const user = await this.databaseService.user.findFirst({
      where: {
        email: decodedIdToken.email,
        firebaseUid: decodedIdToken.uid,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Unauthorized');
    }

    req.user = user;

    return !!user;
  }
}
