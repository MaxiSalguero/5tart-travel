import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from 'src/DTOS/CreateContact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService){}

    @Get()
    getAllContact(){
        return this.contactService.getAllContact()
    }

    @Post()
    createContact(@Body() comm: CreateContactDto){
        return this.contactService.createContact(comm)
    }
}
