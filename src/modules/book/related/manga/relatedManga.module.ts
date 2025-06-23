import { Module } from '@nestjs/common';
import { RelatedMangaController } from './relatedManga.controller';
import { RelatedMangaService } from './relatedManga.service';
import { RelatedMangaRepository } from './relatedManga.repository';
import { RelatedBookRepository } from '../__common/relatedBook.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [RelatedMangaController],
    providers: [RelatedMangaService, RelatedMangaRepository, RelatedBookRepository, PrismaService],
})
export class RelatedMangaModule {}
