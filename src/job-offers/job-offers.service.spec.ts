import { Test, TestingModule } from '@nestjs/testing';
import { JobOffersService } from './job-offers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobOffer } from './job-offer.entity';
import { ILike } from 'typeorm';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('JobOffersService', () => {
  let service: JobOffersService;
  const mockRepository = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve()),
    find: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobOffersService,
        {
          provide: getRepositoryToken(JobOffer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JobOffersService>(JobOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getJobOfferById', () => {
    it('should call findOne with correct parameters', async () => {
      const id = 'some-id';
      await service.getJobOfferById(id);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
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
    });
  });

  describe('searchJobOffers', () => {
    it('should call find with correct parameters', async () => {
      const query = 'some-query';
      await service.searchJobOffers(query);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: [{ position: ILike(`%${query}%`), state: 'published' }],
        select: ['id', 'position', 'employer_name'],
      });
    });
  });
  describe('updateJobOfferState', () => {
    it('should throw an error if state is not valid', async () => {
      const id = 'some-id';
      const state = 'invalid-state';
      await expect(service.updateJobOfferState(id, state)).rejects.toThrow(
        HttpException,
      );
    });

    it('should throw an error if job offer is not found', async () => {
      const id = 'some-id';
      const state = 'published';
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.updateJobOfferState(id, state)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update the state if job offer is found and state is valid', async () => {
      const id = 'some-id';
      const state = 'published';
      const jobOffer = { id, state: 'expired' };
      mockRepository.findOne.mockResolvedValue(jobOffer);
      const result = await service.updateJobOfferState(id, state);
      expect(result.jobOffer.state).toEqual(state);
      expect(result.message).toEqual('Job offer status updated successfully');
    });
  });
});
