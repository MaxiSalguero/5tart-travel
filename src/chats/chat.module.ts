import { Module, OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chatRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { MessageEntity } from 'src/entidades/message.entity';
import { UserEntity } from 'src/entidades/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([MessageEntity,UserEntity])],
  providers: [ChatService,ChatRepository,ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
