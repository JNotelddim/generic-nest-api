import { BadRequestError, CustomError } from './error-classes';

export class UnauthorizedError extends CustomError {
  constructor(message: string, code = 401) {
    super(message, code);
  }
}

export class WeakPasswordError extends BadRequestError {
  constructor() {
    super('Password too weak');
  }
}

export class InvalidEmailAddressError extends BadRequestError {
  constructor() {
    super('Invalid email address');
  }
}

export class EmailAddressAlreadyTakenError extends BadRequestError {
  constructor() {
    super('An account already exists for this email address');
  }
}

export class UsernameAlreadyTakenError extends BadRequestError {
  constructor() {
    super('Username is already taken');
  }
}

export class BadDeleteInputError extends BadRequestError {
  constructor() {
    super('No accounts aligned with the given input.');
  }
}

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Invalid credentials');
  }
}

export class InvalidAccessTokenError extends UnauthorizedError {
  constructor() {
    super(`The value of the access_token for provider is invalid`);
  }
}

export class InvalidNonceError extends UnauthorizedError {
  constructor() {
    super(`The value of the nonce for provider is invalid`);
  }
}

export class ProviderError extends UnauthorizedError {
  constructor() {
    super(`Error signing in with provider`);
  }
}

export class InvalidResetCodeError extends BadRequestError {
  constructor() {
    super('Invalid password reset code');
  }
}

export class InvalidRefreshTokenError extends BadRequestError {
  constructor() {
    super('Invalid refresh token. User must re-authenticate');
  }
}
