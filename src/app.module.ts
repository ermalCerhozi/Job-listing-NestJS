import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOffersController } from './job-offers/job-offers.controller';
import { JobOffersService } from './job-offers/job-offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOffer } from './job-offers/job-offer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Fjalkalimi.123',
      database: 'job-postings',
      entities: [JobOffer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([JobOffer]),
  ],
  controllers: [AppController, JobOffersController],
  providers: [AppService, JobOffersService],
})
export class AppModule {}
