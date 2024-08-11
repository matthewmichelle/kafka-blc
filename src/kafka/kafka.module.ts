import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka.service.producer';
import { KafkaConsumerService } from './kafka.service.consumer';
import { EventEmitterService } from '../kafka/kafka.service.event-emitter';
import { KafkaBlcConfig } from '../../src/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(),]
})
export class KafkaModule {
  static forRoot(config: KafkaBlcConfig) {
    return {
      module: KafkaModule,
      providers: [
        {
          provide: 'KAFKA_BLC_CONFIG',
          useValue: config,
        },
        KafkaConsumerService,
        EventEmitterService,
        KafkaProducerService,
      ],
      exports: [
        KafkaConsumerService,
        EventEmitterService,
        KafkaProducerService,
      ],
    };
  }
}
