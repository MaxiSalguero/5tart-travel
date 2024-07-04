import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from 'src/DTOS/CreateContact.dto';
import { ContactEntity } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactRepository {
    constructor(@InjectRepository(ContactEntity)
                private readonly contactRepository: Repository<ContactEntity>){}


    async getAllContact() {
        const message: ContactEntity[] = await this.contactRepository.find()

        if (message.length == 0) {
            return `No hay mensajes`
        }

        return message
    }

    async createContact(comm: CreateContactDto) {
        const newContact = await this.contactRepository.create(comm);
        await this.contactRepository.save(newContact)

        return `Enviado`
    }
}
