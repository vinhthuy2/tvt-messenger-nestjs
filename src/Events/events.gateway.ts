import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDto, toMessageDto } from '../messages/message.types';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class EventsGateway {
  constructor(private messageService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: MessageDto) {
    const message = await this.messageService.create(payload);
    this.server.emit(payload.to, toMessageDto(message));
  }
}
