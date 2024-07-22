import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from '../conversations/conversation.types';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  from: User;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  @Column()
  isRead: boolean;

  @Column()
  isDelivered: boolean;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
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

export function toMessageDto(message: Message): MessageDto {
  return {
    id: message.id,
    from: message.from.id,
    to: message.conversation.id,
    content: message.content,
    timestamp: message.timestamp,
    isRead: message.isRead,
    isDelivered: message.isDelivered,
  };
}
