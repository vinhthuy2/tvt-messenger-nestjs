import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Conversation } from './conversations/conversation.types';
import { ConversationsModule } from './conversations/conversations.module';
import { EventsModule } from './Events/events.module';
import { UserConversation } from './JoinedEntities/UserConversation';
import { Message } from './messages/message.types';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';
import { SeederService } from './Seeders/seeder.service';
import { SeedersModule } from './Seeders/seeders.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      entities: [User, Message, Conversation, UserConversation],
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true,
      logging: true,
    }),
    UsersModule,
    MessagesModule,
    ConversationsModule,
    SeedersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    // await this.seederService.seed();
  }
}
