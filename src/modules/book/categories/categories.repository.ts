import { Injectable } from '@nestjs/common';
import { CategoriesRepositoryInterface } from './interfaces/categoriesRepository';
import { CategoryDto, toCategoryDto } from './dto/category.dto';
import { GetCategoriesQuery } from './dto/getCategoriesQuery';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getCategoriesWhereInput } from './prisma/getCategoriesWhereInput';

@Injectable()
export class CategoriesRepository implements CategoriesRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getGenres(query: GetCategoriesQuery): Promise<CategoryDto[]> {
        const genres = await this.prisma.bookGenres.findMany({
            where: getCategoriesWhereInput(query.search),
            select: { id: true, ru: true, en: query.lang === 'en' },
        });
        return toCategoryDto(genres, query.lang);
    }

    async getTags(query: GetCategoriesQuery): Promise<CategoryDto[]> {
        const tags = await this.prisma.bookTags.findMany({
            where: getCategoriesWhereInput(query.search),
            select: { id: true, ru: true, en: query.lang === 'en' },
        });
        return toCategoryDto(tags, query.lang);
    }
}
