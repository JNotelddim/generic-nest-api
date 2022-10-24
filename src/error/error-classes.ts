// import { StatusCodes } from 'http-status-codes';

// export class CustomError  {
//   constructor(
//     message: string,
//     code: string,
//     statusCode: StatusCodes = StatusCodes.OK,
//     name = 'BraverError',
//   ) {
//     super(message, code, {
//       statusCode,
//     });

//     Object.defineProperty(this, 'name', { value: name });
//   }
// }

// export class BadRequestError extends CustomError {
//   constructor(message: string, code = 'BAD_REQUEST') {
//     super(message, code, StatusCodes.BAD_REQUEST);
//   }
// }

// export class NotFoundError extends CustomError {
//   constructor(message: string, code = 'NOT_FOUND') {
//     super(message, code, StatusCodes.NOT_FOUND);
//   }
// }

// export class ForbiddenError extends CustomError {
//   constructor(message: string, code = 'FORBIDDEN') {
//     super(message, code, StatusCodes.FORBIDDEN);
//   }
// }

// export class ConflictError extends CustomError {
//   constructor(message: string, code = 'CONFLICT') {
//     super(message, code, StatusCodes.CONFLICT);
//   }
// }

// export class UnknownError extends CustomError {
//   constructor(
//     message = 'An unknown error has occurred',
//     code = 'UNKNOWN_ERROR',
//   ) {
//     super(message, code, StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// }
