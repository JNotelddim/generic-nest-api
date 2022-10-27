import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    message: string,
    statusCode: number,
    name = 'GenericNestAPIError',
  ) {
    super(message, statusCode);

    Object.defineProperty(this, 'name', { value: name });
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, code = 400) {
    super(message, code);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, code = 404) {
    super(message, code);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string, code = 403) {
    super(message, code);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string, code = 409) {
    super(message, code);
  }
}

export class UnknownError extends CustomError {
  constructor(message = 'An unknown error has occurred', code = 500) {
    super(message, code);
  }
}
