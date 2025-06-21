import { Injectable } from '@nestjs/common';
import { MangaGenresRepositoryInterface } from './interfaces/mangaGenresRepository';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { CategoriesResponseArrayData, toCategoriesDto } from '../../dto/category.dto';
import { getGenres } from './prisma/getGenres';

@Injectable()
export class MangaGenresRepository implements MangaGenresRepositoryInterface {
    constructor() {}
    async getGenres(search: string, lang: LangType): Promise<CategoriesResponseArrayData> {
        const genres = await getGenres(search);
        return { data: toCategoriesDto(genres, lang) };
    }
}
