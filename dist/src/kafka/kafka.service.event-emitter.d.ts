import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class EventEmitterService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    fireEvent(message: any): Promise<void>;
    onEvent(callback: (message: any) => void): Promise<void>;
}
