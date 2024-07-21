import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationDto } from './conversation.types';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async createConversation(@Body() dto: ConversationDto) {
    const entity = await this.conversationsService.create(dto);
    return entity.id;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.conversationsService.findOne(id);
  }

  @Post('/get-by-participants')
  async getByParticipants(@Body() dto: { userIds: string[] }) {
    return await this.conversationsService.findByParticipants(dto.userIds);
  }

  @Get()
  async getAll() {
    return await this.conversationsService.findAll();
  }
}
