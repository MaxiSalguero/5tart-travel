import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyEntity } from 'src/entities/agency.entity';
import { TourEntity } from 'src/entities/tour.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgencyRepository {
  constructor(
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    @InjectRepository(TourEntity)
    private readonly toursRepository: Repository<TourEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async getTotalMount(agencyId: string) {
    const agency: AgencyEntity = await this.agencyRepository.findOne({
      where: { id: agencyId },
      relations: { orders: true },
    });

    if (!agency) {
      throw new NotFoundException('No se encontro la agencia');
    }

    let totalPrice: number = 0;

    const ordersNotFinished = agency.orders.filter(
      (order) => !order.isFinished,
    );

    ordersNotFinished.forEach((order) => {
      totalPrice += order.price;
    });

    const totalAmount = totalPrice * 0.95;

    return totalAmount;
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

  async deleteTour(id: string, agencyId: string) {
    const agency = await this.agencyRepository.findOne({
      where: { id: agencyId },
      relations: { tours: true },
    });

    if (!agency) {
      throw new BadRequestException('La agencia no existe');
    }

    const tour: TourEntity = await this.toursRepository.findOneBy({ id: id });

    if (!tour) {
      throw new NotFoundException(`No se encontró el tour`);
    }

    agency.tours = agency.tours.filter((tour) => tour.id !== id);

    await this.agencyRepository.save(agency);

    return 'Tour eliminado correctamente';
  }

  async emptyTotalAmount(agencyId: string) {
    const agency = await this.agencyRepository.findOne({
      where: { id: agencyId },
      relations: { orders: true },
    });

    if (!agency) {
      throw new BadRequestException('La agencia no existe');
    }

    agency.orders.forEach((order) => {
      order.isFinished = true;
    });

    await this.agencyRepository.save(agency);

    return agency;
  }

  async getByIdAgency(id: string) {
    const agency: AgencyEntity = await this.agencyRepository.findOne({
      where: { id },
      relations: { tours: true, orders: true },
    });

    if (!agency) {
      throw new BadRequestException('La agencia no existe');
    }

    return agency;
  }

  async activeAgency(id: string) {
    const agency = await this.agencyRepository.findOne({
      where: { id },
      relations: { tours: true },
    });

    if (!agency) {
      throw new NotFoundException('no existe la agencia');
    }

    if (agency.isActive === true) {
      throw new NotFoundException('la agencia ya esta activa');
    }

    agency.isActive = true;
    agency.role = 'agency';

    const tours = agency.tours.map((tour) => {
      tour.isActive = true;
      return tour;
    });
  
    await this.toursRepository.save(tours);
    await this.agencyRepository.save(agency);

    return agency;
  }

  async disableAgency(id: string) {
    const agency = await this.agencyRepository.findOne({
      where: { id },
      relations: { tours: true },
    });

    if (!agency) {
      throw new NotFoundException(`no se encontró la agencia con id ${id}`);
    }

    if (agency.isActive === false) {
      throw new NotFoundException('la agencia ya se encuentra inactiva');
    }

    agency.isActive = false;
    agency.role = null;

    const tours = agency.tours.map((tour) => {
      tour.isActive = false;
      return tour;
    });
  
    await this.toursRepository.save(tours);
    await this.agencyRepository.save(agency);

    return agency;
  }

  async getDisableAgency() {
    const disAgency: AgencyEntity[] = await this.agencyRepository.find({
      where: { isActive: false },
    });

    if (disAgency.length == 0) {
      return 'no hay agencias desactivadas';
    }

    return disAgency;
  }

  async getSeenDisableAgency() {
    const disAgency: AgencyEntity[] = await this.agencyRepository.find({
      where: { isActive: false, isSeen: false },
    });

    if (disAgency.length == 0) {
      return 'no hay agencias desactivadas';
    }

    return disAgency;
  }

  async putSeenDisableAgency(id: string) {
    const disAgency: AgencyEntity = await this.agencyRepository.findOne({
      where: { id: id },
    });
    const disUser: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (disAgency) {
      disAgency.isSeen = true;
      await this.agencyRepository.save(disAgency);
      return disAgency;
    }

    if (disUser) {
      disUser.isSeen = true;
      await this.userRepository.save(disUser);
      return disUser;
    }
  }
}
