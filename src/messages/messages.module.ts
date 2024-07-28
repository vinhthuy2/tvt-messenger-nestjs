import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { UserConversationModule } from '../JoinedEntities/user-conversation.module';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { Message } from './message.types';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, UserConversation]),
    ConversationsModule,
    UsersModule,
    UserConversationModule,
  ],
  providers: [MessagesService],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
