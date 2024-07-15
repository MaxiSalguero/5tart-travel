import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from 'src/DTOS/CreateContact.dto';
import { ContactEntity } from 'src/entities/contact.entity';
import { mailsServices } from 'src/mails/mails.service';
import { Repository } from 'typeorm';

@Injectable()
export class ContactRepository {
    constructor(@InjectRepository(ContactEntity)
                private readonly contactRepository: Repository<ContactEntity>,
                private readonly mailService: mailsServices,){}


    async getAllContact() {
        const message: ContactEntity[] = await this.contactRepository.find()

        if (message.length == 0) {
            return `No hay mensajes`
        }

        return message
    }
    async getContactById(userId: string) {
        const contact: ContactEntity = await this.contactRepository.findOne({
          where: { id: userId },
        });
    
        if (!contact) {
          throw new NotFoundException('Usuario no encontrado');
        }
        await this.mailService.sendThankYouMail(contact.mail, contact.username)
        return contact;
      }
      async deleteContactById(userId: string): Promise<void> {
        const contact: ContactEntity = await this.contactRepository.findOne({
          where: { id: userId },
        });
    
        if (!contact) {
          throw new NotFoundException('Usuario no encontrado');
        }
    
        await this.contactRepository.remove(contact);
      }

    async createContact(comm: CreateContactDto) {
        const newContact = await this.contactRepository.create(comm);
        await this.contactRepository.save(newContact)

        return `Enviado`
    }
}
