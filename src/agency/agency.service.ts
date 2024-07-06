import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './agency.repository';
import { TourEntity } from 'src/entities/tour.entity';

@Injectable()
export class AgencyServices {
  constructor(private agencyRepository: AgencyRepository) {}

  getAgency() {
    return this.agencyRepository.getAgency();
  }

  deleteAgency(id: string) {
    return this.agencyRepository.deleteAgency(id);
  }

  deleteTour(id: string, agencyId: string) {
    return this.agencyRepository.deleteTour(id, agencyId);
  }

  getByIdAgency(id: string) {
    return this.agencyRepository.getByIdAgency(id);
  }

  activeAgency(id: string) {
    return this.agencyRepository.activeAgency(id);
  }

  disableAgency(id: string) {
    return this.agencyRepository.disableAgency(id);
  }
}
