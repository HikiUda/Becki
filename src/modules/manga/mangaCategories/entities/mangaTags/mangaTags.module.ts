import { Module } from '@nestjs/common';
import { MangaTagsController } from './mangaTags.controller';
import { MangaTagsRepository } from './mangaTags.repository';
import { MangaTagsService } from './mangaTags.service';

@Module({
    controllers: [MangaTagsController],
    providers: [MangaTagsService, MangaTagsRepository],
})
export class MangaTagsModule {}
