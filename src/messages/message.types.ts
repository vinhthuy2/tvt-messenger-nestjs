import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConversationEntity } from '../conversations/conversation.types';
import { UserEntity } from '../users/user.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.sentMessages)
  from: string;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  @Column()
  isRead: boolean;

  @Column()
  isDelivered: boolean;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  conversation: ConversationEntity;
}

export interface MessageDto {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
}

export function toMessageDto(message: MessageEntity): MessageDto {
  return {
    id: message.id,
    from: message.from,
    to: message.conversation.id,
    content: message.content,
    timestamp: message.timestamp,
    isRead: message.isRead,
    isDelivered: message.isDelivered,
  };
}
