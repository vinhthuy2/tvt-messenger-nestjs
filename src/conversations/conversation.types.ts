import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message, MessageDto, toMessageDto } from '../messages/message.types';
import { User } from '../users/user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @ManyToMany(() => UserConversation, (uc) => uc.conversation)
  userConversations: UserConversation[];

  @ManyToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @OneToOne(() => Message, (message) => message.conversation)
  lastMessage?: Message;

  @Column()
  createdAt: Date;

  @Column()
  isGroup: boolean;

  @Column()
  lastUpdated: Date;

  constructor(name: string, participants: User[], createdAt: Date) {
    this.name = name;
    // this.participants = participants;
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

export interface UserConversationsDto {
  userId: string;
  items: ConversationSummaryDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ConversationSummaryDto {
  conversationId: string;
  conversationName: string;
  avatar: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  } | null;
  lastSeen: Date;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
}

export function mapToConversationDto(
  conversation: Conversation,
): ConversationDto {
  return {
    id: conversation.id,
    name: conversation.name,
    avatar: conversation.avatar,
    participantIds: conversation.userConversations.map((uc) => uc.user.id),
    messages: conversation.messages.map(toMessageDto),
    createdAt: conversation.createdAt,
    isGroup: conversation.isGroup,
  };
}
