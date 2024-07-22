import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversationModule } from '../JoinedEntities/user-conversation.module';
import { UsersModule } from '../users/users.module';
import { Conversation } from './conversation.types';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  providers: [ConversationsService],
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UsersModule,
    UserConversationModule,
  ],
  controllers: [ConversationsController],
  exports: [TypeOrmModule],
})
export class ConversationsModule {}
