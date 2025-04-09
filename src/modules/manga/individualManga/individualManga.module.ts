import { Module } from '@nestjs/common';
import { IndividualMangaController } from './entities/individualManga/individualManga.controller';
import { IndividualMangaRepository } from './entities/individualManga/individualManga.repository';
import { IndividualMangaService } from './entities/individualManga/individualManga.service';
import { BookmarkModule } from './entities/bookmark/bookmark.module';
import { RateModule } from './entities/rate/rate.module';

@Module({
    imports: [BookmarkModule, RateModule],
    controllers: [IndividualMangaController],
    providers: [IndividualMangaService, IndividualMangaRepository],
})
export class IndividualMangaModule {}
