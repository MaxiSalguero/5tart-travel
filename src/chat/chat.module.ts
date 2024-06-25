import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  // imports:[TypeOrmModule.forFeature([Message,UserEntity])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
