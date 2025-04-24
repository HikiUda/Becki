import { Injectable } from '@nestjs/common';
import { MangaGenresRepositoryInterface } from './interfaces/mangaGenresRepository';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto, toCategoriesDto } from '../../dto/category.dto';
import { getGenres } from './prisma/getGenres';

@Injectable()
export class MangaGenresRepository implements MangaGenresRepositoryInterface {
    constructor() {}
    async getGenres(search: string, lang: LangType): Promise<CategoryDto[]> {
        const genres = await getGenres(search);
        return toCategoriesDto(genres, lang);
    }
}
