// import { Injectable } from '@nestjs/common';
// import { DonationRepository } from './donation.repository';
// import { DonationEntity } from 'src/entidades/donation.entity';
// import { CreateDonationDto } from 'src/dto/createDonation.dto';

// @Injectable()
// export class DonationService {
//     constructor(private readonly donationrepository:DonationRepository){}
    
//     async donation (){
//         return await this.donationrepository.donation()
//     }
    
//     async donationById (id:string){
//         return await this.donationrepository.donationById(id)
//     }
    
//     async userDonation(userid: string){
//         return await this.donationrepository.userDonation(userid)
//     }
    
//     async shelterDonation(shelterid:string){
//         return await this.donationrepository.shelterDonation(shelterid)
//     }
    
//     async newDonation(donation:CreateDonationDto){
//         return await this.donationrepository.newDonation(donation)
//     }
    
//     async confirmDonation(donation:DonationEntity){
//         return await this.donationrepository.confirmDonation(donation)
//     }
    
            
// }
