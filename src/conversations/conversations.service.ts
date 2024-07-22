import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { User } from '../users/user.entity';
import {
  Conversation,
  ConversationDto,
  mapToConversationDto,
  UserConversationsDto,
} from './conversation.types';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private repository: Repository<Conversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
  ) {}

  async findAll(): Promise<Conversation[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<ConversationDto | null> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      return null;
    }
    return mapToConversationDto(entity);
  }

  async findByUserId(
    userId: string,
    page: number = 0,
    pageSize: number = 10,
  ): Promise<UserConversationsDto> {
    const userConversations = await this.userConversationRepository.find({
      where: {
        user: {
          id: Equal(userId),
        },
      },
      skip: page * pageSize,
      take: pageSize,
      relations: ['conversation', 'conversation.lastMessage'],
    });

    return {
      items: userConversations.map((c) => {
        return {
          conversationId: c.conversation.id,
          conversationName: c.conversation.name,
          avatar: c.conversation.avatar,
          isGroup: c.conversation.isGroup,
          isArchived: c.isArchived,
          isMuted: c.isMuted,
          isPinned: c.isPinned,
          lastSeen: c.lastSeen,
          lastMessage: c.conversation.lastMessage
            ? {
                content: c.conversation.lastMessage.content,
                timestamp: c.conversation.lastMessage.timestamp,
              }
            : null,
        };
      }),
      userId,
      total: userConversations.length,
      page,
      pageSize,
    };
  }

  async findByParticipants(
    participantIds: string[],
  ): Promise<Conversation[] | null> {
    const participants = await this.userRepository.find({
      where: {
        id: In(participantIds),
      },
    });

    if (participants.length !== participantIds.length) {
      throw new Error('Some participants not found!');
    }

    return await this.repository
      .createQueryBuilder('c')
      .select('c')
      .innerJoin('c.participants', 'p')
      .groupBy('c.id')
      .having('COUNT(p.id) = :participantCount', {
        participantCount: participantIds.length,
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('uc.conversationId')
          .from('user_conversation', 'uc')
          .where('uc.userId IN (:...participantIds)', { participantIds })
          .groupBy('uc.conversationId')
          .having('COUNT(uc.userId) = :participantCount', {
            participantCount: participantIds.length,
          })
          .getQuery();

        return 'c.id IN ' + subQuery;
      })
      .getMany();
  }

  async create(dto: ConversationDto): Promise<Conversation> {
    const participantIds = dto.participantIds;
    const participants = await this.userRepository.find({
      where: {
        id: In(participantIds),
      },
    });
    if (participants.length !== participantIds.length) {
      throw new Error('Some participants not found!');
    }

    const conversation: Conversation = new Conversation(
      dto.name,
      participants,
      dto.createdAt,
    );

    return this.repository.save(conversation);
  }
}
