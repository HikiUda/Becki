import { CategoryDto } from '../dto/category.dto';
import { GetCategoriesQuery } from '../dto/getCategoriesQuery';

export interface CategoriesRepositoryInterface {
    getGenres: (query: GetCategoriesQuery) => Promise<CategoryDto[]>;
    getTags: (query: GetCategoriesQuery) => Promise<CategoryDto[]>;
}
