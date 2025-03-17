import { Module } from '@nestjs/common';
import { GetMangaController } from './getManga.controller';
import { GetMangaRepository } from './getManga.repository';
import { GetMangaService } from './getManga.service';

@Module({
    controllers: [GetMangaController],
    providers: [GetMangaService, GetMangaRepository],
})
export class GetMangaModule {}
