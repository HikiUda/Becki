import { Injectable } from '@nestjs/common';
import { MangaTagsRepositoryInterface } from './interfaces/mangaTagsRepository';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto, toCategoriesDto } from '../../dto/category.dto';
import { getTags } from './prisma/getTags';

@Injectable()
export class MangaTagsRepository implements MangaTagsRepositoryInterface {
    constructor() {}
    async getTags(search: string, lang: LangType): Promise<CategoryDto[]> {
        const tags = await getTags(search);
        return toCategoriesDto(tags, lang);
    }
}
