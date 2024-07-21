import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationEntity } from '../conversations/conversation.types';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepository: Repository<ConversationEntity>,
  ) {}

  async seed() {
    // Seed users UserEntity
    const user1 = this.userRepository.create({
      email: 'user1@mail.com',
      name: 'User 1',
      avatar: '',
      isOnline: false,
      lastSeen: new Date(),
    });

    const user2 = this.userRepository.create({
      email: 'user2@mail.com',
      name: 'User 2',
      avatar: '',
      isOnline: false,
      lastSeen: new Date(),
    });

    const user3 = this.userRepository.create({
      email: 'user3@mail.com',
      name: 'User 3',
      avatar: '',
      isOnline: false,
      lastSeen: new Date(),
    });

    await this.userRepository.save(user1);
    await this.userRepository.save(user2);
    await this.userRepository.save(user3);

    const conversation = this.conversationRepository.create({
      name: 'User1, User2',
      participants: [user1, user2],
      createdAt: new Date(),
      avatar: '',
      isGroup: false,
    });

    const conversation2 = this.conversationRepository.create({
      name: 'User1, User2, User3',
      participants: [user1, user2, user3],
      createdAt: new Date(),
      avatar: '',
      isGroup: true,
    });

    const conversation3 = this.conversationRepository.create({
      name: 'User1, User3',
      participants: [user1, user3],
      createdAt: new Date(),
      avatar: '',
      isGroup: false,
    });

    await this.conversationRepository.save(conversation3);
    await this.conversationRepository.save(conversation);
    await this.conversationRepository.save(conversation2);
  }
}
