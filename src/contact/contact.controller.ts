import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from 'src/DTOS/CreateContact.dto';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService){}

    @Get()
    getAllContact(){
        return this.contactService.getAllContact()
    }

    @Post('sendEmail/:id')
    async sendThankYouMail(@Param('id') userId: string) {
      try {
        const contact = await this.contactService.getcontactById(userId);
        return {
          message: 'Correo de agradecimiento enviado exitosamente',
        };
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Usuario no encontrado o error al enviar el correo',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    @Post()
    createContact(@Body() comm: CreateContactDto){
        return this.contactService.createContact(comm)
    }
}
