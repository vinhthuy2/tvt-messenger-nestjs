import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from '../conversations/conversation.types';
import { UserEntity } from '../users/user.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ConversationEntity])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedersModule {}
