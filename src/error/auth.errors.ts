// import { StatusCodes } from 'http-status-codes';
// import { BadRequestError, BraverError } from './error-classes';
// import { OauthProvider } from '~src/enums/oauth-provider.enum';

// export class UnauthorizedError extends BraverError {
//   constructor(message: string, code = 'UNAUTHORIZED') {
//     super(message, code, StatusCodes.UNAUTHORIZED);
//   }
// }

// export class WeakPasswordError extends BadRequestError {
//   constructor() {
//     super('Password too weak', 'WEAK_PASSWORD');
//   }
// }

// export class InvalidEmailAddressError extends BadRequestError {
//   constructor() {
//     super('Invalid email address', 'INVALID_EMAIL_ADDRESS');
//   }
// }

// export class EmailAddressAlreadyTakenError extends BadRequestError {
//   constructor() {
//     super(
//       'An account already exists for this email address',
//       'EMAIL_ADDRESS_ALREADY_TAKEN',
//     );
//   }
// }

// export class UsernameAlreadyTakenError extends BadRequestError {
//   constructor() {
//     super('Username is already taken', 'USERNAME_ALREADY_TAKEN');
//   }
// }

// export class InvalidCredentialsError extends UnauthorizedError {
//   constructor() {
//     super('Invalid credentials', 'INVALID_CREDENTIALS');
//   }
// }

// export class InvalidAccessTokenError extends UnauthorizedError {
//   constructor(provider: OauthProvider) {
//     super(
//       `The value of the access_token for provider ${provider} is invalid`,
//       'INVALID_ACCESS_TOKEN',
//     );
//   }
// }

// export class InvalidNonceError extends UnauthorizedError {
//   constructor() {
//     super(
//       `The value of the nonce for provider ${OauthProvider.apple} is invalid`,
//       'INVALID_NONCE',
//     );
//   }
// }

// export class OauthProviderError extends UnauthorizedError {
//   constructor(provider: OauthProvider) {
//     super(`Error signing in with ${provider}`, 'OAUTH_PROVIDER_ERROR');
//   }
// }

// export class InvalidOobCodeError extends BadRequestError {
//   constructor() {
//     super('Invalid password reset code', 'INVALID_OOB_CODE');
//   }
// }

// export class InvalidRefreshTokenError extends BadRequestError {
//   constructor() {
//     super(
//       'Invalid refresh token. User must re-authenticate',
//       'INVALID_REFRESH_TOKEN',
//     );
//   }
// }
