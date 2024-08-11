import { RetryOptions, ProducerConfig } from 'kafkajs';
export interface KafkaBlcConfig {
    clientId: string;
    brokerUrls: [string];
    groupId: string;
    topicResponse: string;
    topicRequest: string;
    producerPolicy?: ProducerConfig;
    requestTimeout?: number;
    retries?: RetryOptions;
    connectionTimeout?: number;
}
