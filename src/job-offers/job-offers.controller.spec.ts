import { Test, TestingModule } from '@nestjs/testing'
import { JobOffersController } from './job-offers.controller'
import { JobOffersService } from './job-offers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { JobOffer } from './job-offer.entity'
import { NotFoundException } from '@nestjs/common'

describe('JobOffersController', () => {
    let controller: JobOffersController
    let service: JobOffersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [JobOffersController],
            providers: [
                JobOffersService,
                {
                    provide: getRepositoryToken(JobOffer),
                    useValue: {},
                },
            ],
        }).compile()

        controller = module.get<JobOffersController>(JobOffersController)
        service = module.get<JobOffersService>(JobOffersService) // Add this line
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('getJobOffer', () => {
        it('should return a job offer if it exists and is not expired', async () => {
            const jobOffer = { state: 'active' }
            jest.spyOn(service, 'getJobOfferById').mockResolvedValue(jobOffer)

            expect(await controller.getJobOffer('1')).toBe(jobOffer)
        })

        it('should throw an error if the job offer does not exist', async () => {
            jest.spyOn(service, 'getJobOfferById').mockResolvedValue(null)

            await expect(controller.getJobOffer('1')).rejects.toThrow(
                NotFoundException,
            )
        })

        it('should throw an error if the job offer has expired', async () => {
            const jobOffer = { state: 'expired' }
            jest.spyOn(service, 'getJobOfferById').mockResolvedValue(jobOffer)

            await expect(controller.getJobOffer('1')).rejects.toThrow(
                NotFoundException,
            )
        })
    })

    describe('searchJobOffers', () => {
        it('should return search results', async () => {
            const searchResults = [{}, {}, {}] as unknown as JobOffer[]
            jest.spyOn(service, 'searchJobOffers').mockResolvedValue(
                searchResults,
            )

            expect(await controller.searchJobOffers('query')).toBe(
                searchResults,
            )
        })
    })
})
