import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOffer } from './job-offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectRepository(JobOffer)
    private jobOfferRepository: Repository<JobOffer>,
  ) {}
  async getJobOfferById(id: any): Promise<JobOffer> {
    console.log(`Searching for job offer with id: ${id}`);
    return await this.jobOfferRepository.findOne({ where: { id: id } });
  }
}
