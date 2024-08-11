import { ApplicationErrors } from './custom-error.filter';
export declare class NotFoundError extends ApplicationErrors {
    constructor(message?: string);
}
export declare class ValidationError extends ApplicationErrors {
    constructor(errors?: string[]);
}
export declare class UnauthorizedError extends ApplicationErrors {
    constructor(message?: string);
}
export declare class InteralServeError extends ApplicationErrors {
    constructor(message?: string);
}
export declare class BadRequestError extends ApplicationErrors {
    constructor(message?: string);
}
export declare class ServiceUnavailableError extends ApplicationErrors {
    constructor(message?: string);
}
