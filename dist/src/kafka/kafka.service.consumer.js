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
var KafkaConsumerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const kafka_service_event_emitter_1 = require("./kafka.service.event-emitter");
let KafkaConsumerService = KafkaConsumerService_1 = class KafkaConsumerService {
    constructor(eventEmitterService, config) {
        this.eventEmitterService = eventEmitterService;
        this.config = config;
        this.logger = new common_1.Logger(KafkaConsumerService_1.name);
        this.topicResponse = this.config.topicResponse;
        this.topicRequest = this.config.topicRequest;
    }
    async onModuleInit() {
        try {
            await this.initializeConsumer();
            await this.subscribeToTopics();
        }
        catch (error) {
            this.logger.error(`Error initializing Kafka consumer: ${error}`);
            process.exit(1);
        }
    }
    async onModuleDestroy() {
        try {
            await this.disconnectConsumer();
        }
        catch (error) {
            this.logger.error(`Error closing Kafka consumer: ${error}`);
        }
    }
    async initializeConsumer() {
        const kafka = new kafkajs_1.Kafka({
            logLevel: kafkajs_1.logLevel.ERROR,
            clientId: this.config.clientId,
            brokers: this.config.brokerUrls,
        });
        this.consumer = kafka.consumer({
            groupId: this.config.groupId,
        });
    }
    async subscribeToTopics() {
        const topics = [this.topicRequest, this.topicResponse];
        await this.consumer.subscribe({ topics });
        this.logger.log(`Subscribed to topics: ${topics.join(', ')}`);
        const consumerAssignments = {};
        this.consumer.on(this.consumer.events.GROUP_JOIN, (data) => {
            Object.keys(data.payload.memberAssignment).forEach((memberId) => {
                consumerAssignments[memberId] = Math.min(...data.payload.memberAssignment[memberId]);
                this.partitionId = consumerAssignments[this.topicResponse];
            });
        });
        this.consumer.on(this.consumer.events.HEARTBEAT, ({ timestamp }) => {
            this.interval = timestamp;
        });
        await this.consumer.run({
            eachMessage: this.handleMessage.bind(this),
        });
        this.logger.log('Kafka consumer initialized successfully');
    }
    async disconnectConsumer() {
        this.logger.log('Closing Kafka consumer...');
        await this.consumer.disconnect();
        this.logger.log('Kafka consumer closed successfully');
    }
    async handleMessage(payload) {
        const { topic, message } = payload;
        try {
            const messageContent = message.value.toString();
            const parsedMessage = JSON.parse(messageContent);
            const correlationId = message.headers?.correlationId?.toString();
            if (correlationId) {
                await this.eventEmitterService.fireEvent({
                    correlationId,
                    message: parsedMessage,
                });
                await this.commitMessageOffset(payload);
            }
            else {
                this.logger.warn(`Skipping message with missing correlation ID from topic: ${topic}`);
            }
        }
        catch (error) {
            this.logger.error(`Error handling message from topic ${topic}: ${error}`);
        }
    }
    async commitMessageOffset(payload) {
        const { topic, partition, message } = payload;
        await this.consumer.commitOffsets([
            { topic, partition, offset: message.offset },
        ]);
        this.logger.log('Offset committed successfully');
    }
};
exports.KafkaConsumerService = KafkaConsumerService;
exports.KafkaConsumerService = KafkaConsumerService = KafkaConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('KAFKA_BLC_CONFIG')),
    __metadata("design:paramtypes", [kafka_service_event_emitter_1.EventEmitterService, Object])
], KafkaConsumerService);
//# sourceMappingURL=kafka.service.consumer.js.map