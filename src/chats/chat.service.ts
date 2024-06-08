import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chatRepository';
import { ChatEntity } from 'src/entidades/chat.entity';

@Injectable()
export class ChatService {
    constructor(private readonly chatRepository:ChatRepository){}

    newMessage(content: string){
        return this.chatRepository.newMessage(content)
    }

    getMessages(){
        return this.getMessages();
    }


}