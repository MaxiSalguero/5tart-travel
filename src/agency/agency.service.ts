import { Injectable } from '@nestjs/common';
import { AgencyRepository } from './agency.repository';

@Injectable()
export class AgencyServices {
  constructor(private agencyRepository: AgencyRepository) {}

  getAgencies() {
    return this.agencyRepository.getAgencies();
  }

  getDisableAgencies() {
    return this.agencyRepository.getDisableAgencies();
  }

  getSeenDisableAgency() {
    return this.agencyRepository.getSeenDisableAgency();
  }

  getTotalMount(agencyId: string) {
    return this.agencyRepository.getTotalMount(agencyId);
  }

  getByIdAgency(id: string) {
    return this.agencyRepository.getByIdAgency(id);
  }

  putSeenDisableAgency(id: string) {
    return this.agencyRepository.putSeenDisableAgency(id);
  }

  activeAgency(id: string) {
    return this.agencyRepository.activeAgency(id);
  }

  disableAgency(id: string) {
    return this.agencyRepository.disableAgency(id);
  }

  emptyTotalAmount(agencyId: string) {
    return this.agencyRepository.emptyTotalAmount(agencyId);
  }

  deleteTour(id: string, agencyId: string) {
    return this.agencyRepository.deleteTour(id, agencyId);
  }

  deleteAgency(id: string) {
    return this.agencyRepository.deleteAgency(id);
  }
}
