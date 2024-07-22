import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversation } from './UserConversation';

@Module({
  imports: [TypeOrmModule.forFeature([UserConversation])],
  exports: [TypeOrmModule],
})
export class UserConversationModule {}
