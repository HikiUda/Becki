import { Injectable } from '@nestjs/common';
import { MangaGenresServiceInterface } from './interfaces/mangaGenresService';
import { MangaGenresRepository } from './mangaGenres.repository';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto } from '../../dto/category.dto';

@Injectable()
export class MangaGenresService implements MangaGenresServiceInterface {
    constructor(private mangaGenresRepository: MangaGenresRepository) {}
    async getGenres(search: string, lang: LangType): Promise<CategoryDto[]> {
        return await this.mangaGenresRepository.getGenres(search, lang);
    }
}
