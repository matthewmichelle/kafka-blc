import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  // Function to fire an event
  async fireEvent(message: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.eventEmitter.once('event_once', () => {
          resolve();
        });
        this.eventEmitter.emit('event_once', message);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Function to listen to the event
  async onEvent(callback: (message: any) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.eventEmitter.once('event_once', callback);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
