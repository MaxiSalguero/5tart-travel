import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { channel } from "diagnostics_channel";
import { ChatEntity } from "src/entidades/chat.entity";
import { MessageEntity } from "src/entidades/message.entity";
import { LessThan, MoreThan, Repository } from "typeorm";

@Injectable()
export class ChatRepository {
    constructor(
        
        @InjectRepository(MessageEntity) private messageRepository:Repository<MessageEntity>
    
    ){}


    async newMessage(messageContent: string){
        const today = new Date()
        const newMessage = this.messageRepository.create({ content:messageContent, createdAt: today })
        return await this.messageRepository.save(newMessage)
    }

    async getMessages(){
        const messages = await this.messageRepository.find()

        if(!messages) throw new NotFoundException('No hay mensajes cargados')

        return messages
    }

    async getMessageByDate(date: Date) {
        const messages = await this.messageRepository.find({
            where:{
                createdAt: LessThan(date)
            }
        })
        
        if(!messages) throw new NotFoundException('Message no existente')
        
        return messages
    }

}