import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationErrors extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
