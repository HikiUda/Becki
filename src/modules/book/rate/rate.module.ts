import { Module } from '@nestjs/common';
import { MangaRateModule } from './manga/mangaRate.module';
import { RanobeRateModule } from './ranobe/ranobeRate.module';

@Module({
    imports: [MangaRateModule, RanobeRateModule],
})
export class RateModule {}
