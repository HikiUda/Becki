import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateRepository } from './rate.repository';
import { RateService } from './rate.service';

@Module({
    controllers: [RateController],
    providers: [RateService, RateRepository],
})
export class RateModule {}
