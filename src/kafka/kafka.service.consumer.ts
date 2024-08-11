import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka, logLevel } from 'kafkajs';
import { EventEmitterService } from './kafka.service.event-emitter';
import { KafkaBlcConfig } from '../../src/configuration';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  public consumer: Consumer;
  private readonly logger = new Logger(KafkaConsumerService.name);
  private topicResponse: string;
  private topicRequest: string;
  public partitionId: number;
  public interval: number;

  constructor(
    private readonly eventEmitterService: EventEmitterService,
    @Inject('KAFKA_BLC_CONFIG') private config: KafkaBlcConfig,
  ) {
    this.topicResponse = this.config.topicResponse;
    this.topicRequest = this.config.topicRequest;
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.initializeConsumer();
      await this.subscribeToTopics();
    } catch (error) {
      this.logger.error(`Error initializing Kafka consumer: ${error}`);
      process.exit(1);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.disconnectConsumer();
    } catch (error) {
      this.logger.error(`Error closing Kafka consumer: ${error}`);
    }
  }

  private async initializeConsumer(): Promise<void> {
    const kafka = new Kafka({
      logLevel: logLevel.ERROR,
      clientId: this.config.clientId, // Unique client ID for Kafka connections
      brokers: this.config.brokerUrls,
    });

    this.consumer = kafka.consumer({
      groupId: this.config.groupId,
    });
  }

  private async subscribeToTopics(): Promise<void> {
    const topics = [this.topicRequest, this.topicResponse];
    await this.consumer.subscribe({ topics });
    this.logger.log(`Subscribed to topics: ${topics.join(', ')}`);

    const consumerAssignments: { [key: string]: number } = {};
    this.consumer.on(this.consumer.events.GROUP_JOIN, (data: any) => {
      Object.keys(data.payload.memberAssignment).forEach((memberId) => {
        consumerAssignments[memberId] = Math.min(
          ...data.payload.memberAssignment[memberId],
        );
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

  private async disconnectConsumer(): Promise<void> {
    this.logger.log('Closing Kafka consumer...');
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer closed successfully');
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
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
      } else {
        this.logger.warn(
          `Skipping message with missing correlation ID from topic: ${topic}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error handling message from topic ${topic}: ${error}`,
      );
    }
  }

  private async commitMessageOffset(
    payload: EachMessagePayload,
  ): Promise<void> {
    const { topic, partition, message } = payload;
    await this.consumer.commitOffsets([
      { topic, partition, offset: message.offset },
    ]);
    this.logger.log('Offset committed successfully');
  }
}
