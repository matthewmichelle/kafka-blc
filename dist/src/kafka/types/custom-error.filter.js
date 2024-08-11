"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationErrors = void 0;
const common_1 = require("@nestjs/common");
class ApplicationErrors extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.ApplicationErrors = ApplicationErrors;
//# sourceMappingURL=custom-error.filter.js.map