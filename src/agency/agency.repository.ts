import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from 'src/entities/agency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyRepository {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
  ) {}

  async getAgency() {
    const agencys: AgencyEntity[] = await this.agencyRepository.find({
      relations: { tours: true },
    });

    if (agencys.length == 0) {
      return 'No hay agencias registradas en la base de datos';
    }

    return agencys;
  }

  async createAgency(agency) {
    const ExistAgency: AgencyEntity = await this.agencyRepository.findOne({
      where: { mail: agency.mail },
    });

    if (ExistAgency) {
      throw new BadRequestException('El mail ingresado ya esta registrado');
    }

    const newUser = this.agencyRepository.create({ ...agency });
    await this.agencyRepository.save(newUser);

    return 'Agencia creada';
  }

  async deleteAgency(id: string) {
    const Agency = await this.agencyRepository.findOneBy({ id });

    if (!Agency) {
      throw new BadRequestException('La agencia no existe');
    }

    await this.agencyRepository.remove(Agency);

    return 'Agencia eliminada correctamente';
  }

  async getByIdAgency(id: string) {
    const agency: AgencyEntity = await this.agencyRepository.findOne({where: {id: id}, relations: {tours: true}});

    if (!agency) {
      throw new BadRequestException('La agencia no existe');
    }

    return agency;
  }

}
