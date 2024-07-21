import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { MessageEntity } from './message.types';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), ConversationsModule],
  providers: [MessagesService],
  exports: [TypeOrmModule, MessagesService],
})
export class MessagesModule {}
