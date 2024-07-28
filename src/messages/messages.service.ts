import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../conversations/conversation.types';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { User } from '../users/user.entity';
import { Message, MessageDto, toMessageDto } from './message.types';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(messageDto: MessageDto) {
    const message = await this.messageRepository.save(
      await this.fromDtoToEntity(messageDto),
    );
    return toMessageDto(message);
  }

  private async fromDtoToEntity(message: MessageDto) {
    const conversation = await this.conversationRepository.findOneBy({
      id: message.to,
    });

    if (!conversation) {
      throw new Error('Conversation not found!');
    }

    const user = await this.userRepository.findOneBy({
      id: message.from,
    });

    console.log('user', user, message.from);

    if (!user) {
      throw new Error('User not found!');
    }

    return {
      id: message.id,
      content: message.content,
      timestamp: message.timestamp,
      from: user,
      conversation: conversation,
      isDelivered: false,
      isRead: false,
    };
  }
}
