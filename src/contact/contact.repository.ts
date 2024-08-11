import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from 'src/entities/contact.entity';
import { MailsServices } from 'src/mails/mails.service';
import { Repository } from 'typeorm';

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    private readonly mailService: MailsServices,
  ) {}

  async createContact(contact: Partial<ContactEntity>) {
    const newContact = this.contactRepository.create(contact);
    await this.contactRepository.save(newContact);

    return `Formulario enviado exitosamente`;
  }

  async sendMail(contactId: string) {
    const contact: ContactEntity = await this.contactRepository.findOne({
      where: { id: contactId },
    });

    if (!contact) {
      throw new NotFoundException('Contacto no encontrado');
    }

    await this.mailService.sendThankYouMail(contact.mail, contact.username);
    return 'Mensaje generico enviado exitosamente';
  }

  async getAllContacts() {
    const message: ContactEntity[] = await this.contactRepository.find();

    if (message.length == 0) {
      return `No hay mensajes de contactos aun`;
    }

    return message;
  }

  async deleteContact(id: string) {
    const contact: ContactEntity = await this.contactRepository.findOne({
      where: { id },
    });

    if (!contact) {
      throw new BadRequestException('id de contacto no encontrado');
    }

    await this.contactRepository.remove(contact);

    return 'Contacto eliminado exitosamente';
  }
}
