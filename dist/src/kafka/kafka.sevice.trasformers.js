"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaTrasformersService = void 0;
const error_types_data_1 = require("./types/error-types.data");
class KafkaTrasformersService {
    constructor() { }
    TrasformersDataObject(data) {
        if (data.error) {
            throw new error_types_data_1.ServiceUnavailableError(`t24 Service Unavailable`);
        }
        else {
            return data.message.Data;
        }
    }
    TrasformersAuthObject(data) {
        return !data.error;
    }
}
exports.KafkaTrasformersService = KafkaTrasformersService;
//# sourceMappingURL=kafka.sevice.trasformers.js.map