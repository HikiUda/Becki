import { Injectable } from '@nestjs/common';
import { MangaTagsRepositoryInterface } from './interfaces/mangaTagsRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { CategoriesResponseArrayData, toCategoriesDto } from '../../dto/category.dto';
import { getTags } from './prisma/getTags';

@Injectable()
export class MangaTagsRepository implements MangaTagsRepositoryInterface {
    constructor() {}
    async getTags(search: string, lang: LangType): Promise<CategoriesResponseArrayData> {
        const tags = await getTags(search);
        return { data: toCategoriesDto(tags, lang) };
    }
}
