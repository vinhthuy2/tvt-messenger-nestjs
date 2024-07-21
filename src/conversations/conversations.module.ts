import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ConversationEntity } from './conversation.types';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  providers: [ConversationsService],
  imports: [TypeOrmModule.forFeature([ConversationEntity]), UsersModule],
  controllers: [ConversationsController],
  exports: [TypeOrmModule],
})
export class ConversationsModule {}
