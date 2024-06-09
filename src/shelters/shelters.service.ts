import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ShelterEntity } from '../entidades/shelter.entity';
import { MailService } from '../mails/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SheltersService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    @InjectRepository(ShelterEntity)
    private readonly sheltersRepository: Repository<ShelterEntity>,
    private readonly mailService: MailService,
  ) {}

  async getShelters() {
    const shelters = await this.sheltersRepository.find({
      relations: ['pets'],
    });

    if (shelters.length === 0) {
      throw new NotFoundException('no existen usuarios');
    }

    return shelters;
  }

  async activeShelter(id: string) {
    const shelter = await this.sheltersRepository.findOne({ where: { id } });

    if (!shelter) {
      throw new NotFoundException('no existe el refugio');
    }
    if (shelter.isActive === true) {
      throw new NotFoundException('el refugio ya esta activo');
    }

    shelter.isActive = true;
    shelter.role = 'shelter';

    await this.mailService.sendShelterActivationMail(
      shelter.email,
      shelter.shelter_name,
    );

    const updateShelter = this.sheltersRepository.save(shelter);

    return updateShelter;
  }

  async getShelterById(id: string) {
    const shelter = await this.sheltersRepository.findOne({
      where: { id },
      relations: ['pets'],
    });
    if (!shelter) {
      throw new NotFoundException('no se encontro el refugio');
    }
    return { shelter };
  }

  async deleteShelter(id: string) {
    const deleteShelter = await this.sheltersRepository.findOne({
      where: { id },
    });

    if (!deleteShelter) {
      throw new NotFoundException(`no se encontró el refugio con id ${id}`);
    }

    if (deleteShelter.isActive === false) {
      throw new NotFoundException('el refugio no está activo');
    }

    deleteShelter.isActive = false;
    deleteShelter.role = "user"

    await this.mailService.deleteshelterMail(
      deleteShelter.email,
      deleteShelter.shelter_name,
    );

    return this.sheltersRepository.save(deleteShelter);
  }

  async updatedProfile(id: string, shelter: Partial<ShelterEntity>) {
    const updateShelter = await this.sheltersRepository.findOne({
      where: { id },
    });
    if (!updateShelter) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    await this.sheltersRepository.merge(updateShelter, shelter);
    await this.sheltersRepository.save(updateShelter);

    return ` el shelter con id ${id} y nombre ${updateShelter.name} se ah actualizado con exito`;
  }

  async filterShelters(
    exotic_animals?: string,
    location?: string,
    zona?: string,
  ) {
    const conditions: any = { isActive: true };

    if (exotic_animals) {
      conditions.exotic_animals = exotic_animals;
    }
    if (location) {
      conditions.location = location;
    }
    if (zona) {
      conditions.zona = zona;
    }

    return await this.sheltersRepository.find({ where: conditions });
  }
}
