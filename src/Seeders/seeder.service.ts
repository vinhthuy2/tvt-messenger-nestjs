import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../conversations/conversation.types';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message } from '../messages/message.types';
import { User } from '../users/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async seed() {
    // Seed users UserEntity
    const user1 = await this.saveUser('user1@mail.com', 'User 1');
    const user2 = await this.saveUser('user2@mail.com', 'User 2');
    const user3 = await this.saveUser('user3@mail.com', 'User 3');

    const [conversation, conversation2, conversation3] =
      await this.saveConversations();

    await this.saveMessage(user1, conversation);

    await this.saveUserConversation(user1, conversation);
    await this.saveUserConversation(user2, conversation);
    await this.saveUserConversation(user1, conversation2);
    await this.saveUserConversation(user2, conversation2);
    await this.saveUserConversation(user3, conversation2);
    await this.saveUserConversation(user1, conversation3);
    await this.saveUserConversation(user3, conversation3);
  }

  private async saveUser(email: string, name: string) {
    const user = this.userRepository.create({
      email: email,
      name: name,
      avatar: '',
      isOnline: false,
      lastSeen: new Date(),
    });

    return await this.userRepository.save(user);
  }

  private async saveConversations() {
    const conversation = this.conversationRepository.create({
      name: 'User1, User2',
      createdAt: new Date(),
      avatar: '',
      isGroup: false,
      lastUpdated: new Date(),
    });

    const conversation2 = this.conversationRepository.create({
      name: 'User1, User2, User3',
      createdAt: new Date(),
      avatar: '',
      isGroup: true,
      lastUpdated: new Date(),
    });

    const conversation3 = this.conversationRepository.create({
      name: 'User1, User3',
      createdAt: new Date(),
      avatar: '',
      isGroup: false,
      lastUpdated: new Date(),
    });

    await this.conversationRepository.save(conversation3);
    await this.conversationRepository.save(conversation);
    await this.conversationRepository.save(conversation2);

    return [conversation, conversation2, conversation3];
  }

  private async saveMessage(user: User, conversation: Conversation) {
    const message = {
      content: 'Hello!!!',
      timestamp: new Date(),
      from: user,
      isDelivered: true,
      isRead: false,
      conversation: conversation,
    };
    return await this.messageRepository.save(
      this.messageRepository.create(message),
    );
  }

  private async saveUserConversation(user: User, conversation: Conversation) {
    const userConversation = this.userConversationRepository.create({
      user,
      conversation,
      lastSeen: new Date(),
    });

    await this.userConversationRepository.save(userConversation);
  }
}
