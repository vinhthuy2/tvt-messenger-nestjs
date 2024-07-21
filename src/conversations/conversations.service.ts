import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import {
  ConversationDto,
  ConversationEntity,
  mapToConversationDto,
} from './conversation.types';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationEntity)
    private repository: Repository<ConversationEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<ConversationEntity[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<ConversationDto | null> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      return null;
    }
    return mapToConversationDto(entity);
  }

  async findByIds(ids: string[]): Promise<ConversationEntity[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async findByParticipants(
    participantIds: string[],
  ): Promise<ConversationEntity[] | null> {
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
          .select('uc.conversation_id')
          .from('user_conversation', 'uc')
          .where('uc.user_id IN (:...participantIds)', { participantIds })
          .groupBy('uc.conversation_id')
          .having('COUNT(uc.user_id) = :participantCount', {
            participantCount: participantIds.length,
          })
          .getQuery();

        return 'c.id IN ' + subQuery;
      })
      .getMany();
  }

  async create(dto: ConversationDto): Promise<ConversationEntity> {
    const participantIds = dto.participantIds;
    const participants = await this.userRepository.find({
      where: {
        id: In(participantIds),
      },
    });
    if (participants.length !== participantIds.length) {
      throw new Error('Some participants not found!');
    }

    const conversation: ConversationEntity = new ConversationEntity(
      dto.name,
      participants,
      dto.createdAt,
    );

    return this.repository.save(conversation);
  }
}
