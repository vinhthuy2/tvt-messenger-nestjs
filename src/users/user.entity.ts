import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message } from '../messages/message.types';

@Entity()
export class User {
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

  @OneToMany(() => UserConversation, (uc) => uc.user)
  userConversations?: UserConversation[];

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: any;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
