import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../conversations/conversation.types';
import { MessageDto, MessageEntity } from './message.types';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,
  ) {}

  async create(messageDto: MessageDto) {
    const message = await this.fromDtoToEntity(messageDto);
    return await this.messageRepository.save(message);
  }

  private async fromDtoToEntity(message: MessageDto) {
    const conversation = await this.conversationRepository.findOneBy({
      id: message.to,
    });

    if (!conversation) {
      throw new Error('Conversation not found!');
    }

    const entity: MessageEntity = {
      id: message.id,
      content: message.content,
      timestamp: message.timestamp,
      from: message.from,
      conversation: conversation,
      isDelivered: false,
      isRead: false,
    };

    return entity;
  }
}
