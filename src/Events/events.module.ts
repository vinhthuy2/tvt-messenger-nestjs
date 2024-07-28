import { Module } from '@nestjs/common';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  imports: [MessagesModule, UsersModule],
})
export class EventsModule {}
