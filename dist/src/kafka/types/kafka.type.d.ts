import { CompressionTypes } from 'kafkajs';
export interface kafkaProducerOptions {
    topic: string;
    compression: CompressionTypes;
    acks?: number;
    messages: KafkaMessageContent[];
}
export interface KafkaMessageContent {
    value: any;
    headers: {
        correlationId?: string;
        partitionReply?: string;
        replyTopic?: string;
        authorization?: string;
        route?: string;
        method?: string;
        otp?: string;
        tracingHeaders?: string;
    };
}
export interface KafkaMessage {
    authorization: string;
    replyTopic: string;
    correlationId: string;
    partitionReply: string;
    params: any;
    functionName: string;
}
