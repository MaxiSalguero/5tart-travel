import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreateAdopcionDto } from '../dto/createAdopcion.dto';
  import { AdoptionEntity } from '../entidades/adoption.entity';
  import { PetsEntity } from '../entidades/pets.entity';
  import { ShelterEntity } from '../entidades/shelter.entity';
  import { UserEntity } from '../entidades/users.entity';
  import { PetsService } from '../pets/pets.service';
  import { Repository } from 'typeorm';
  import * as cron from 'node-cron';
  import { MailService } from '../mails/mail.service';
  @Injectable()
  export class AdoptionRepository {
    private readonly logger = new Logger(MailService.name);
    constructor(
      @InjectRepository(AdoptionEntity)
      private adoptionrepository: Repository<AdoptionEntity>,
      @InjectRepository(ShelterEntity)
      private sheltersRepository: Repository<ShelterEntity>,
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      @InjectRepository(PetsEntity)
      private petsRepository: Repository<PetsEntity>,
      private petsService: PetsService,
      private readonly mailservice: MailService,
    ) {}
  
    async AllAdoptions() {
      const adoptions: AdoptionEntity[] = await this.adoptionrepository.find({
        relations: {
          user: true,
          pet: true,
          shelter: true,
        },
      });
  
      if (adoptions.length == 0) {
        throw new NotFoundException('No existen adopciones');
      }
  
      return adoptions;
    }
  
    async AdoptionsById(id: string) {
      const adoptionId: AdoptionEntity = await this.adoptionrepository.findOneBy({
        id,
      });
  
      if (!adoptionId) {
        throw new NotFoundException('No existe la adopción');
      }
  
      return adoptionId;
    }
  
    async newAdoption(userid: string, petid: string) {
      const user = await this.usersRepository.findOneBy({ id: userid });
      if (!user) {
        throw new BadRequestException(`Usuario no encontrado`);
      }
  
      const pet = await this.petsRepository.findOne({
        where: { id: petid },
        relations: ['shelter'],
      });
      if (!pet) {
        throw new BadRequestException(`Mascota no encontrada`);
      }
  
      const shelterId = pet.shelter.id;
      const shelter = await this.sheltersRepository.findOne({
        where: { id: shelterId },
        relations: ['pets'],
      });
      if (!shelter) {
        throw new BadRequestException(
          `Refugio no encontrado para la mascota especificada`,
        );
      }
  
      const adoption = new AdoptionEntity();
      adoption.date = new Date();
      adoption.user = user;
      adoption.shelter = shelter;
      adoption.pet = pet;
      adoption.isActive = false;
  
      const adop = await this.adoptionrepository.save(adoption);
      if (!adop) {
        throw new NotFoundException(`Error en la Adopción`);
      }
      await this.mailservice.sendPostulacion(
        shelter.name,
        pet.name,
        user.name,
        user.email,
      );
  
      this.scheduleAdoptionCheck(
        adop.id,
        user.name,
        shelter.name,
        pet.name,
        user.email,
      );
  
      return await this.adoptionrepository.find({
        where: { id: adoption.id },
        relations: {
          user: true,
          shelter: true,
          pet: true,
        },
      });
    }
  
    async activateAdoption(adoptionId: string) {
      const adoption = await this.adoptionrepository.findOne({
          where: { id: adoptionId },
          relations: ['user', 'shelter', 'pet'],
      });
  
      if (!adoption) {
          throw new NotFoundException(`Adopción no encontrada`);
      }
  
      if (!adoption.isActive) {
          const updateResult = await this.adoptionrepository.update(adoption.id, { isActive: true });
          
          if (updateResult.affected === 0) {
              throw new Error('No se pudo actualizar la adopción a activa');
          }
  
          const pet = await this.petsRepository.findOneBy({ id: adoption.pet.id });
  
          if (!pet) {
              throw new NotFoundException(`Mascota no encontrada`);
          }
  
          const shelter = await this.sheltersRepository.findOne({
              where: { id: adoption.shelter.id },
              relations: ['pets'],
          });
  
          if (!shelter) {
              throw new NotFoundException(`Refugio no encontrado`);
          }
  
          const user = await this.usersRepository.findOne({
              where: { id: adoption.user.id },
              relations: ['pets'],
          });
  
          if (!user) {
              throw new NotFoundException(`Usuario no encontrado`);
          }
  
          shelter.pets = shelter.pets.filter((p) => p.id !== pet.id);
          await this.sheltersRepository.save(shelter);
  
          user.pets.push(pet);
          await this.usersRepository.save(user);
  
          const updatedUser = await this.usersRepository.findOne({
              where: { id: user.id },
              relations: ['pets'],
          });
  
          if (!updatedUser) {
              throw new NotFoundException(`Usuario no encontrado después de actualizar`);
          }
  
          await this.mailservice.confirmPostulacion(user.email,user.name,pet.name)
  
          return  updatedUser ;
      } else {
          return { message: "La adopción ya está activa." };
      }
  }
  
    async sendPostulacion(
      shelter_name: string,
      pet: string,
      username: string,
      userEmail: string,
    ) {
      const subject = 'Confirmación de Postulación de Adopción';
      const text = `Hola ${username},
      
          Nos alegra informarte que hemos registrado tu postulación para la adopción de ${pet} del refugio ${shelter_name}.
          En un lapso de 72 horas, recibirás una respuesta por correo electrónico confirmando si tu solicitud ha sido aceptada o no.
      
          Saludos cordiales,
          El Equipo de Huellas de Esperanza`;
  
      const html = ` <div style="position: relative; border: 2px solid #ff3366; padding: 20px; background: white; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; max-width: 600px; margin: 0 auto;">
              <p>¡Hola, <strong>${username}</strong>!</p>
              <p>Tu solicitud ha sido recibida correctamente.</p>
              <p>Nos alegra informarte que hemos registrado tu postulación para la adopción de <strong>${pet}</strong> del refugio <strong>${shelter_name}</strong>.</p>
              <p>En un lapso de 72 horas, recibirás una respuesta por correo electrónico confirmando si tu solicitud ha sido aceptada o no.</p>
              <p>Mientras tanto, si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en todo lo que necesites.</p>
              <p>¡Saludos cordiales!</p>
              <p>El Equipo de Huellas de Esperanza</p>
          </div>`;
  
      this.logger.log(
        `Enviando correo a ${userEmail} con asunto "${subject}" y texto "${text}"`,
      );
      await this.mailservice.sendMail(userEmail, subject, text, html);
    }
  
    scheduleAdoptionCheck(
      adoptionId: string,
      username: string,
      sheltername: string,
      pet: string,
      userEmail: string,
    ) {
      //const task = cron.schedule('0 0 */78 * * *',async () => {
          const task = cron.schedule('* * * * *', async () => {
          const adoption = await this.adoptionrepository.findOne({
            where: { id: adoptionId },
            relations: ['user', 'shelter', 'pet'],
          });
  
          if (adoption && !adoption.isActive) {
            const subject =
              'Solicitud de adopción rechazada en Huellas de Esperanza';
            const text = `Estimado/a ${username},\n\nLamentamos informarte que el refugio ${adoption.shelter.shelter_name} no ha aceptado tu solicitud de adopción para ${pet}. Te invitamos a visitar nuestra página y ponerte en contacto con el refugio a través del chat para resolver cualquier duda o inquietud.\n\nCon cariño,\nEl Equipo de Huellas de Esperanza`;
            const html = `<div style="border: 2px solid #ff3366; padding: 20px; background: #ffffff; border-radius: 15px; text-align: center;">
              <p style="color: #ff3366; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Solicitud de adopción rechazada en Huellas de Esperanza</p>
              <p style="color: #000; font-size: 16px; margin-bottom: 20px;">Estimado/a <strong>${username}</strong>,</p>
              <p style="color: #000; font-size: 16px; margin-bottom: 20px;">Lamentamos informarte que el refugio <strong>${adoption.shelter.shelter_name}</strong> no ha aceptado tu solicitud de adopción para <strong>${pet}</strong>.</p>
              <p style="color: #000; font-size: 16px; margin-bottom: 20px;">Te invitamos a visitar nuestra página y ponerte en contacto con el refugio a través del chat para resolver cualquier duda o inquietud.</p>
              <a href="http://tu-pagina-web.com" style="display: inline-block; padding: 10px 20px; background: #ff3366; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Visitar Huellas de Esperanza</a>
              <p style="margin-top: 20px;">Con cariño,</p>
              <p>El Equipo de Huellas de Esperanza</p>
          </div>`;
            await this.mailservice.sendMail(userEmail, subject, text, html);
  
            this.logger.log(
              `Enviando correo de rechazo a ${userEmail} para la adopción de ${pet}`,
            );
          }
        },
        {
          scheduled: true,
          timezone: 'America/Argentina/Buenos_Aires',
        },
      );
  
      task.start();
    }
  
    async Delete(id: string) {
      const adoption = await this.adoptionrepository.findOneBy({ id });
      if (!adoption) {
        throw new NotFoundException('No existe la adopción');
      }
      await this.adoptionrepository.remove(adoption);
  
      return `La adopción fue eliminada`;
    }
  
    async AdoptionUser(userid: string) {
      const user: AdoptionEntity = await this.adoptionrepository.findOne({
        where: { id: userid },
        relations: {
          user: true,
        },
      });
  
      return user;
    }
  
    async AdoptionShelter(shelterid: string) {
      const shelter: AdoptionEntity = await this.adoptionrepository.findOne({
        where: { id: shelterid },
        relations: {
          shelter: true,
        },
      });
  
      return shelter;
    }
  }