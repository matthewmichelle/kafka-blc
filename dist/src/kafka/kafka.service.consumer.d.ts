import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { EventEmitterService } from './kafka.service.event-emitter';
import { KafkaBlcConfig } from '../../src/configuration';
export declare class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly eventEmitterService;
    private config;
    consumer: Consumer;
    private readonly logger;
    private topicResponse;
    private topicRequest;
    partitionId: number;
    interval: number;
    constructor(eventEmitterService: EventEmitterService, config: KafkaBlcConfig);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private initializeConsumer;
    private subscribeToTopics;
    private disconnectConsumer;
    private handleMessage;
    private commitMessageOffset;
}
