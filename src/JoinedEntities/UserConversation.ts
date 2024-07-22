import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from '../conversations/conversation.types';
import { User } from '../users/user.entity';

@Entity('user_conversation')
export class UserConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userConversations)
  user: User;

  @ManyToOne(() => Conversation, (c) => c.userConversations)
  conversation: Conversation;

  @Column()
  isArchived: boolean = false;
  @Column()
  isMuted: boolean = false;
  @Column()
  isPinned: boolean = false;

  @Column()
  lastSeen: Date;
}
