"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.BadRequestError = exports.InteralServeError = exports.UnauthorizedError = exports.ValidationError = exports.NotFoundError = void 0;
const common_1 = require("@nestjs/common");
const custom_error_filter_1 = require("./custom-error.filter");
class NotFoundError extends custom_error_filter_1.ApplicationErrors {
    constructor(message) {
        super(`Not Found Error failed: ${message}`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends custom_error_filter_1.ApplicationErrors {
    constructor(errors) {
        super(`Validation Error failed: ${errors.join(', ')}`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends custom_error_filter_1.ApplicationErrors {
    constructor(message) {
        super(`Unauthorized Error failed: ${message}`, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InteralServeError extends custom_error_filter_1.ApplicationErrors {
    constructor(message) {
        super(`Interal Server Error failed: ${message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.InteralServeError = InteralServeError;
class BadRequestError extends custom_error_filter_1.ApplicationErrors {
    constructor(message) {
        super(`Bad Request Error failed: ${message}`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
class ServiceUnavailableError extends custom_error_filter_1.ApplicationErrors {
    constructor(message) {
        super(`Service Unavailable Error failed: ${message}`, common_1.HttpStatus.SERVICE_UNAVAILABLE);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=error-types.data.js.map