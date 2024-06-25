import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entidades/message.entity';
import { UserEntity } from 'src/entidades/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message,UserEntity])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
