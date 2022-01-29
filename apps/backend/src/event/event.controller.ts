import { Controller, Inject } from '@nestjs/common';
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

    await this.eventService.handleEvent(event);
    channel.ack(originalMsg);
  }
}
