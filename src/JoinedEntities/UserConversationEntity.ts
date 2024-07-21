import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';
import { ConversationEntity } from '../conversations/conversation.types';
import { UserEntity } from '../users/user.entity';

@Entity()
export class UserConversationEntity {
  @PrimaryColumn()
  userId: string;
  @PrimaryColumn()
  conversationId: string;

  @ManyToOne(() => UserEntity, (user) => user.conversations)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: UserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.conversations)
  @JoinColumn([{ name: 'conversationId', referencedColumnName: 'id' }])
  conversations: ConversationEntity[];
}
