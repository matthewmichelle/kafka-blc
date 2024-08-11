"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_service_producer_1 = require("./kafka.service.producer");
const kafka_service_consumer_1 = require("./kafka.service.consumer");
const kafka_service_event_emitter_1 = require("../kafka/kafka.service.event-emitter");
const event_emitter_1 = require("@nestjs/event-emitter");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    static forRoot(config) {
        return {
            module: KafkaModule_1,
            providers: [
                {
                    provide: 'KAFKA_BLC_CONFIG',
                    useValue: config,
                },
                kafka_service_consumer_1.KafkaConsumerService,
                kafka_service_event_emitter_1.EventEmitterService,
                kafka_service_producer_1.KafkaProducerService,
            ],
            exports: [
                kafka_service_consumer_1.KafkaConsumerService,
                kafka_service_event_emitter_1.EventEmitterService,
                kafka_service_producer_1.KafkaProducerService,
            ],
        };
    }
};
exports.KafkaModule = KafkaModule;
exports.KafkaModule = KafkaModule = KafkaModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [event_emitter_1.EventEmitterModule.forRoot(),]
    })
], KafkaModule);
//# sourceMappingURL=kafka.module.js.map