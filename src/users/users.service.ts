import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { toUserDto, User, UserDto } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const entity = await this.usersRepository.findOneBy({ id });
    console.log('entity', entity);
    if (!entity) {
      console.log(`User with id ${id} not found`);
      throw new BadGatewayException(`User with id ${id} not found`);
    }
    return toUserDto(entity);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByConversationId(conversationId: string): Promise<User[]> {
    return (
      await this.userConversationRepository.find({
        where: {
          conversation: {
            id: conversationId,
          },
        },
        relations: ['user'],
      })
    ).map((uc) => uc.user);
  }
}
