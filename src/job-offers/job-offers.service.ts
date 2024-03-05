import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOffer } from './job-offer.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class JobOffersService {
  constructor(
    @InjectRepository(JobOffer)
    private jobOfferRepository: Repository<JobOffer>,
  ) {}

  async getJobOfferById(id: any): Promise<Partial<JobOffer>> {
    console.log(`Searching for job offer with id: ${id}`);
    return await this.jobOfferRepository.findOne({
      where: { id: id },
      select: [
        'id',
        'position',
        'employer_name',
        'summary',
        'description',
        'state',
      ],
    });
  }

  async searchJobOffers(query: string): Promise<JobOffer[]> {
    console.log(`Searching for job offers with query: ${query}`);
    const jobOffers = await this.jobOfferRepository.find({
      where: [{ position: ILike(`%${query}%`), state: 'published' }],
      select: ['id', 'position', 'employer_name'],
    });
    return jobOffers;
  }

  async updateJobOfferState(id: string, state: string) {
    const validStates = ['published', 'expired'];
    if (!validStates.includes(state)) {
      throw new HttpException('State is not valid', HttpStatus.BAD_REQUEST);
    }

    const jobOffer = await this.getJobOfferById(id);
    if (!jobOffer) {
      throw new NotFoundException('Job offer not found');
    }

    jobOffer.state = state;
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Job offer status updated successfully',
      jobOffer,
    };
  }
}
