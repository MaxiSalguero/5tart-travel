import { Controller, Get } from "@nestjs/common";
import { AgencyServices } from "./agency.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Agency')
@Controller('agency')
export class agencyController {
    constructor(private agencyService: AgencyServices){}

    @Get()
    getAgency(){
        return this.agencyService.getAgency()
    }
}