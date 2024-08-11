import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from 'src/DTOS/CreateContact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { GlobalGuard } from 'src/guards/global.guard';

@ApiTags('Contact')
@UseGuards(GlobalGuard)
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Body() contact: CreateContactDto) {
    return this.contactService.createContact(contact);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('sendEmail/:id')
  sendMail(@Param('id') contactId: string) {
    return this.contactService.sendMail(contactId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  deleteContact(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.deleteContact(id);
  }
}
