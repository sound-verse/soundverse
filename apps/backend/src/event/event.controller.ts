import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { IEventMessage } from '@soundverse/shared-rpc-listener-service';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private eventService: EventService) {}
  @MessagePattern({ cmd: 'new-event' }, Transport.RMQ)
  async newEvent(@Payload() event: IEventMessage, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.eventService.handleEvent(event);
      console.log(`Acknowledging event message with transaction hash ${event.transactionHash} ...`);
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);
      console.log(
        `An error occured while handling the event ${event.event} with transactionhash ${event.transactionHash} ${error}. Put event message in the recovery queue ...`,
      );
      channel.reject(originalMsg, false);
    }
  }
}
