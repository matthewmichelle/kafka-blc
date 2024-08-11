"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let EventEmitterService = class EventEmitterService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async fireEvent(message) {
        return new Promise((resolve, reject) => {
            try {
                this.eventEmitter.once('event_once', () => {
                    resolve();
                });
                this.eventEmitter.emit('event_once', message);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async onEvent(callback) {
        return new Promise((resolve, reject) => {
            try {
                this.eventEmitter.once('event_once', callback);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
exports.EventEmitterService = EventEmitterService;
exports.EventEmitterService = EventEmitterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], EventEmitterService);
//# sourceMappingURL=kafka.service.event-emitter.js.map