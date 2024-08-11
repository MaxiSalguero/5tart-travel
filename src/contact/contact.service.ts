import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { ContactEntity } from 'src/entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  createContact(contact: Partial<ContactEntity>) {
    return this.contactRepository.createContact(contact);
  }

  sendMail(contactId: string) {
    return this.contactRepository.sendMail(contactId);
  }

  getAllContacts() {
    return this.contactRepository.getAllContacts();
  }

  deleteContact(id: string) {
    return this.contactRepository.deleteContact(id);
  }
}
