import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdopcionDto } from 'src/dto/createAdopcion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Adoption")
@Controller('adoption')
export class AdoptionController {
    constructor(private readonly adopcionservice : AdoptionService){}

    @Get()
    async AllAdoptions(){
        return await this.adopcionservice.AllAdoptions()
    }

    @Get(':id')
    async adoptionsById(@Param('id', ParseUUIDPipe )id : string){
        return await this.adopcionservice.adoptionsById(id)
    }

    @Post('new')
    async newAdoption(@Body() adoption: CreateAdopcionDto){
        const {user, shelter, pet} = adoption;
        return await this.adopcionservice.newAdoption(user, shelter, pet)
    }

    @Delete('delete/:id')
    async Deleteadoption(@Param('id', ParseUUIDPipe) id: string){
        return await this.adopcionservice.Delete(id)
    }

    @Get('user/:id')
    async adoptionUser(@Param('id',ParseUUIDPipe) userid : string){
        return await this.adopcionservice.adoptionUser(userid)
    }
}
