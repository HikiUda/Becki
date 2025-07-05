import { Injectable } from '@nestjs/common';
import { CategoriesServiceInterface } from './interfaces/categoriesService';
import { CategoriesRepository } from './categories.repository';
import { CategoryDtoList } from './dto/category.dto';
import { GetCategoriesQuery } from './dto/getCategoriesQuery';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
    constructor(private repository: CategoriesRepository) {}

    async getGenres(query: GetCategoriesQuery): Promise<CategoryDtoList> {
        const data = await this.repository.getGenres(query);
        return { data };
    }
    async getTags(query: GetCategoriesQuery): Promise<CategoryDtoList> {
        const data = await this.repository.getTags(query);
        return { data };
    }
}
