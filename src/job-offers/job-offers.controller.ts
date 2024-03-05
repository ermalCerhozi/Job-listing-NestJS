import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';

@Controller('job-offers')
export class JobOffersController {
  constructor(private jobOffersService: JobOffersService) {}

  @Get(':id')
  async getJobOffer(@Param('id') id: string) {
    const jobOffer = await this.jobOffersService.getJobOfferById(id);
    if (!jobOffer || jobOffer.state === 'expired') {
      throw new NotFoundException('Job offer not found or expired');
    }
    return jobOffer;
  }

}
