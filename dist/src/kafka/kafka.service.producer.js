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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var KafkaProducerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaProducerService = KafkaProducerService_1 = class KafkaProducerService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(KafkaProducerService_1.name);
        this.kafka = new kafkajs_1.Kafka({
            clientId: this.config.clientId,
            brokers: this.config.brokerUrls,
            connectionTimeout: this.config.connectionTimeout,
            requestTimeout: this.config.requestTimeout,
            retry: this.config.retries,
        });
        this.producer = this.kafka.producer(this.config.producerPolicy);
    }
    async onModuleInit() {
        try {
            this.logger.log('Connecting to Kafka producer...');
            await this.producer.connect();
            this.logger.log('Kafka producer connected successfully');
        }
        catch (error) {
            this.logger.error(`Error connecting to Kafka producer: ${error}`);
            process.exit(1);
        }
    }
    async sendMessage(kafkaOptions) {
        try {
            const result = await this.producer.send(kafkaOptions);
            return result[0];
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error}`);
        }
    }
    async onModuleDestroy() {
        try {
            this.logger.log('Disconnecting from Kafka producer...');
            await this.producer.disconnect();
            this.logger.log('Kafka producer disconnected successfully');
        }
        catch (error) {
            this.logger.error(`Error disconnecting from Kafka producer: ${error}`);
        }
    }
};
exports.KafkaProducerService = KafkaProducerService;
exports.KafkaProducerService = KafkaProducerService = KafkaProducerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KAFKA_BLC_CONFIG')),
    __metadata("design:paramtypes", [Object])
], KafkaProducerService);
//# sourceMappingURL=kafka.service.producer.js.map