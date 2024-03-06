import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { JobOffersService } from './job-offers.service'

@Controller('job-offers')
export class JobOffersController {
    constructor(private jobOffersService: JobOffersService) {}

    @Get('/offer/:id')
    async getJobOffer(@Param('id') id: string) {
        const jobOffer = await this.jobOffersService.getJobOfferById(id)
        if (!jobOffer) {
            throw new NotFoundException('Job offer not found')
        }
        if (jobOffer.state === 'expired') {
            throw new NotFoundException('Job offer has expired')
        }
        return jobOffer
    }

    @Post('/search')
    async searchJobOffers(@Body('query') query: string) {
        return await this.jobOffersService.searchJobOffers(query)
    }

    @Put('/offer')
    async updateJobOfferState(
        @Body() updateRequest: { id: string; state: string },
    ) {
        return await this.jobOffersService.updateJobOfferState(
            updateRequest.id,
            updateRequest.state,
        )
    }
}
