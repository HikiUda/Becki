import { CategoryDtoList } from '../dto/category.dto';
import { GetCategoriesQuery } from '../dto/getCategoriesQuery';

export interface CategoriesControllerInterface {
    getGenres: (query: GetCategoriesQuery) => Promise<CategoryDtoList>;
    getTags: (query: GetCategoriesQuery) => Promise<CategoryDtoList>;
}
