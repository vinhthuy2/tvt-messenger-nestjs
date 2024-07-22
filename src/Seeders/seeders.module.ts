import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../conversations/conversation.types';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message } from '../messages/message.types';
import { User } from '../users/user.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, UserConversation, Message]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedersModule {}
