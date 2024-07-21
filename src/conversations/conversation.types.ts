import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  MessageDto,
  MessageEntity,
  toMessageDto,
} from '../messages/message.types';
import { UserEntity } from '../users/user.entity';

@Entity('conversations')
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @ManyToMany(() => UserEntity, (user) => user.conversations)
  participants: UserEntity[];

  @ManyToMany(() => MessageEntity, (message) => message.conversation)
  messages: MessageEntity[];

  @Column()
  createdAt: Date;

  @Column()
  isGroup: boolean;

  constructor(name: string, participants: UserEntity[], createdAt: Date) {
    this.name = name;
    this.participants = participants;
    this.createdAt = createdAt;
    this.isGroup = participants?.length > 2;
  }
}

export interface ConversationDto {
  id: string;
  name: string;
  avatar?: string;
  participantIds: string[];
  messages?: MessageDto[];
  createdAt: Date;
  isGroup: boolean;
}

export function mapToConversationDto(
  conversation: ConversationEntity,
): ConversationDto {
  return {
    id: conversation.id,
    name: conversation.name,
    avatar: conversation.avatar,
    participantIds: conversation.participants.map((p) => p.id),
    messages: conversation.messages.map(toMessageDto),
    createdAt: conversation.createdAt,
    isGroup: conversation.isGroup,
  };
}
