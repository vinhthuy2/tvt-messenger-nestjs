import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  imports: [MessagesModule],
})
export class EventsModule {}
