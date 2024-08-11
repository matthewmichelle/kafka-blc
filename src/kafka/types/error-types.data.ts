import { HttpStatus } from '@nestjs/common';
import { ApplicationErrors } from './custom-error.filter';

export class NotFoundError extends ApplicationErrors {
  constructor(message?: string) {
    super(`Not Found Error failed: ${message}`, HttpStatus.NOT_FOUND);
  }
}

export class ValidationError extends ApplicationErrors {
  constructor(errors?: string[]) {
    super(
      `Validation Error failed: ${errors.join(', ')}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UnauthorizedError extends ApplicationErrors {
  constructor(message?: string) {
    super(`Unauthorized Error failed: ${message}`, HttpStatus.UNAUTHORIZED);
  }
}

export class InteralServeError extends ApplicationErrors {
  constructor(message?: string) {
    super(
      `Interal Server Error failed: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class BadRequestError extends ApplicationErrors {
  constructor(message?: string) {
    super(`Bad Request Error failed: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class ServiceUnavailableError extends ApplicationErrors {
  constructor(message?: string) {
    super(
      `Service Unavailable Error failed: ${message}`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

// Add more custom error classes as needed...
