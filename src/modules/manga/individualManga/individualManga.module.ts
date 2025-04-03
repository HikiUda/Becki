import { Module } from '@nestjs/common';
import { IndividualMangaController } from './individualManga.controller';
import { IndividualMangaRepository } from './individualManga.repository';
import { IndividualMangaService } from './individualManga.service';

@Module({
    controllers: [IndividualMangaController],
    providers: [IndividualMangaService, IndividualMangaRepository],
})
export class IndividualMangaModule {}
