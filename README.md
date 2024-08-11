## Kafka-BlC Module for NestJS
 
### Description
 
This Kafka module for NestJS is aims to simplify the implementation of asynchronous message processing within a microservices architecture. It supports the handling of message requests and responses, allowing processes to wait for responses from other microservices that reply to different topics. After receiving a reply on the specified topic, the module consumes the message and fires an event once.
 
### Features
 
- **Asynchronous Communication:** Enables seamless asynchronous message processing using Apache Kafka.
- **Request-Response Pattern:** Supports the request-response pattern, allowing a service to wait for a response from other microservices.
- **Topic-Based Messaging:** Facilitates communication between microservices by publishing and subscribing to Kafka topics.
- **Event-Driven:** Consumes messages from reply topics and fires events once the message is processed.
- **Scalability:** Designed to scale efficiently with your application, handling high throughput and providing fault tolerance.
- **Easy Integration:** Integrates smoothly with NestJS applications, leveraging the power and flexibility of the NestJS framework.

### How to Use
 
#### Installation
 
First, install the module using npm:
 
```bash
npm install kafka-blc
```
 
#### Setup
 
1. **Import the Module:** In your `AppModule`, import the Kafka module using the `forRoot` method to configure it with your custom settings:
 
   ```typescript
   import { Module } from '@nestjs/common';
   import { KafkaModule } from 'kafka-blc';
 
   @Module({
     imports: [KafkaModule.forRoot({
       clientId: 'matthew-ms',
       brokerUrls: ['localhost:9092'],
       groupId: 'matthew-ms',
       topicRequest: 'topicRequest',
       topicResponse: 'topicResponse',
     })],
   })
   export class AppModule {}
   ```
 
#### 1. Sending a Kafka Message
 
The `sendKafkaMessage` function allows you to send a message to a Kafka topic. It includes parameters for the message payload, headers like `correlationId`, and optional tracing information.
 
**Example:**
 
```typescript
private async sendKafkaMessage(
  requestInfo: RequestInfo,
  correlationId: string,
  tracingHeaderObj: any
): Promise<void> {
  const producerOptions: kafkaProducerOptions = {
    topic: this.requestTopic,
    compression: CompressionTypes.GZIP,
    acks: 1,
    messages: [
      {
        value: JSON.stringify(requestInfo),
        headers: {
          correlationId,
          partitionReply: (this.kafkaConsumerService.partitionId || 0).toString(),
          replyTopic: this.topicResponse,
          // any data you needed
        },
      },
    ],
  };
 
  await this.kafkaProducerService.sendMessage(producerOptions);
}
```
 
- **Parameters:**
  - `requestInfo`: The data to be sent in the Kafka message.
  - `correlationId`: A unique identifier to correlate requests and responses.
  - `tracingHeaderObj`: Optional tracing data for distributed tracing.
 
- **Usage Example:**
 
```typescript
async function exampleUsage() {
  const requestInfo = { /* your request data */ };
  const correlationId = 'unique-correlation-id';
  const tracingHeaderObj = { /* your tracing data */ };
 
  await sendKafkaMessage(requestInfo, correlationId, tracingHeaderObj);
}
```
 
#### 2. Waiting for and Handling an Event
 
The `waitForEvent` function listens for a specific event and processes it. It either resolves with the event data or rejects if a timeout occurs.
 
**Example:**
 
```typescript
private async waitForEvent(): Promise<any> {
  const eventHandledSuccessfully: any = new Promise((resolve, reject) => {
    this.eventEmitterService.onEvent(async (currencyData: any) => {
      try {
        const success = await this.handleEventFromService(currencyData);
        resolve(success);
      } catch (error) {
        reject(error);
      }
    });
  });
 
  const timeOutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new ServiceUnavailableError('Service Unavailable'));
    }, this.timeout);
  });
 
  return Promise.race([timeOutPromise, eventHandledSuccessfully]);
}
 
private async handleEventFromService(data: any): Promise<any> {
  try {
    return data.message;
  } catch (error) {
    throw error;
  }
}
```
 
- **Usage Example:**
 
```typescript
async function exampleWaitForEvent() {
  try {
    const response = await waitForEvent();
    console.log('Event handled successfully:', response);
  } catch (error) {
    console.error('Failed to handle event:', error);
  }
}
```
 
### Combined Workflow
 
You can combine these functions in a workflow to send a message and handle the response:
 
```typescript
async function exampleWorkflow() {
  const requestInfo = { /* your request data */ };
  const correlationId = 'unique-correlation-id';
  const tracingHeaderObj = { /* your tracing data */ };
 
  // Send the Kafka message
  await sendKafkaMessage(requestInfo, correlationId, tracingHeaderObj);
 
  // Wait for the response event
  try {
    const response = await waitForEvent();
    console.log('Response received from event:', response);
  } catch (error) {
    console.error('Error or timeout occurred:', error);
  }
}
```

4. **Run Your Application:** Start your NestJS application. The Kafka module will automatically handle the message processing, sending requests to `topicRequest` and listening for responses on `topicResponse`.


### Summary
 
- **Client ID:** Specifies the client ID for the Kafka producer/consumer.
- **Broker URLs:** Specifies the Kafka broker addresses.
- **Group ID:** Defines the group ID for the Kafka consumer.
- **Topic Request:** The topic used for sending message requests.
- **Topic Response:** The topic where replies are expected and processed.
 
This setup makes it straightforward to configure and use your Kafka module in a NestJS application, enabling seamless asynchronous communication through a request-response pattern with Kafka.

- **Send Kafka Message:** Use `sendKafkaMessage` to produce a message to a Kafka topic, including headers and optional tracing data.
- **Handle Events:** Use `waitForEvent` to listen for and handle responses via events, with built-in timeout handling.
 
This setup ensures seamless asynchronous communication between microservices using Kafka, enabling efficient message request-response patterns.