import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

  @Get('/list/:userId')
  async getByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.conversationsService.findByUserId(userId, page, pageSize);
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
