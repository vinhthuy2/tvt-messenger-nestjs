import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDto } from '../messages/message.types';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(
    private messageService: MessagesService,
    private userService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: MessageDto) {
    const message = await this.messageService.create(payload);
    const users = await this.userService.findByConversationId(message.to);
    users.forEach((u) => {
      this.server.to(u.id).emit('messageReceived', message);
    });
    return message;
  }
}
