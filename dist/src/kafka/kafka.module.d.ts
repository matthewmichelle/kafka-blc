import { KafkaProducerService } from './kafka.service.producer';
import { KafkaConsumerService } from './kafka.service.consumer';
import { EventEmitterService } from '../kafka/kafka.service.event-emitter';
import { KafkaBlcConfig } from '../../src/configuration';
export declare class KafkaModule {
    static forRoot(config: KafkaBlcConfig): {
        module: typeof KafkaModule;
        providers: (typeof KafkaProducerService | typeof EventEmitterService | typeof KafkaConsumerService | {
            provide: string;
            useValue: KafkaBlcConfig;
        })[];
        exports: (typeof KafkaProducerService | typeof EventEmitterService | typeof KafkaConsumerService)[];
    };
}
