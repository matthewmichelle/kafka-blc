import { Kafka, RecordMetadata } from 'kafkajs';
import { kafkaProducerOptions } from './types/kafka.type';
import { KafkaBlcConfig } from '../../src/configuration';
export declare class KafkaProducerService {
    private config;
    private producer;
    private readonly logger;
    kafka: Kafka;
    constructor(config: KafkaBlcConfig);
    onModuleInit(): Promise<void>;
    sendMessage(kafkaOptions: kafkaProducerOptions): Promise<RecordMetadata>;
    onModuleDestroy(): Promise<void>;
}
