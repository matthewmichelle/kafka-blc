import { Inject, Injectable, Logger } from '@nestjs/common';
import { Kafka, Producer, RecordMetadata } from 'kafkajs';
import { kafkaProducerOptions } from './types/kafka.type';
import { KafkaBlcConfig } from '../../src/configuration';

@Injectable()
export class KafkaProducerService {
  private producer: Producer;
  private readonly logger = new Logger(KafkaProducerService.name);
  public kafka: Kafka;

  constructor(@Inject('KAFKA_BLC_CONFIG') private config: KafkaBlcConfig) {
    this.kafka = new Kafka({
      clientId: this.config.clientId, // Unique client ID for Kafka connections
      brokers: this.config.brokerUrls,
      connectionTimeout: this.config.connectionTimeout,
      requestTimeout: this.config.requestTimeout,
      retry: this.config.retries,
    });
    this.producer = this.kafka.producer(this.config.producerPolicy);
  }

  async onModuleInit(): Promise<void> {
    try {
      this.logger.log('Connecting to Kafka producer...');
      await this.producer.connect();
      this.logger.log('Kafka producer connected successfully');
    } catch (error) {
      this.logger.error(`Error connecting to Kafka producer: ${error}`);
      process.exit(1);
    }
  }

  async sendMessage(
    kafkaOptions: kafkaProducerOptions,
  ): Promise<RecordMetadata> {
    try {
      const result = await this.producer.send(kafkaOptions);
      return result[0];
    } catch (error) {
      this.logger.error(`Error sending message: ${error}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      this.logger.log('Disconnecting from Kafka producer...');
      await this.producer.disconnect();
      this.logger.log('Kafka producer disconnected successfully');
    } catch (error) {
      this.logger.error(
        `Error disconnecting from Kafka producer: ${error}`,
      );
    }
  }
}
