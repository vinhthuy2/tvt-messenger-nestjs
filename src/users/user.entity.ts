import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationEntity } from '../conversations/conversation.types';
import { MessageEntity } from '../messages/message.types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  isOnline: boolean;

  @Column()
  lastSeen: Date;

  @ManyToMany(
    () => ConversationEntity,
    (conversation) => conversation.participants,
  )
  @JoinTable({
    name: 'user_conversation',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'conversation_id',
      referencedColumnName: 'id',
    },
  })
  conversations?: ConversationEntity[];

  @OneToMany(() => MessageEntity, (message) => message.from)
  sentMessages: any;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
