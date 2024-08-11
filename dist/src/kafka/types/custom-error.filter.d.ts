import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ApplicationErrors extends HttpException {
    constructor(message: string, status: HttpStatus);
}
