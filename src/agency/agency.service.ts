import { Injectable } from "@nestjs/common";
import { AgencyRepository } from "./agency.repository";

@Injectable()

export class AgencyServices{
    constructor(private agencyRepository: AgencyRepository){}

    getAgency() {
        return this.agencyRepository.getAgency()
    }
}