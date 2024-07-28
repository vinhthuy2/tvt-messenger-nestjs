import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);
    res.status(HttpStatus.OK).json(user);
  }
}
