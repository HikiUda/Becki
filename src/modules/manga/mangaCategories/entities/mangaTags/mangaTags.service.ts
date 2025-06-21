import { Injectable } from '@nestjs/common';
import { MangaTagsServiceInterface } from './interfaces/mangaTagsService';
import { MangaTagsRepository } from './mangaTags.repository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { CategoriesResponseArrayData } from '../../dto/category.dto';

@Injectable()
export class MangaTagsService implements MangaTagsServiceInterface {
    constructor(private mangaTagsRepository: MangaTagsRepository) {}
    async getTags(search: string, lang: LangType): Promise<CategoriesResponseArrayData> {
        return await this.mangaTagsRepository.getTags(search, lang);
    }
}
