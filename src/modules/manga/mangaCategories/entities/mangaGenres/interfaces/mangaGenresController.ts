import { CategoriesResponseArrayData } from '../../../dto/category.dto';
import { GetCategoryQuery } from '../../../dto/getCategoryQuery';

export interface MangaGenresControllerInterface {
    getGenres: (query: GetCategoryQuery) => Promise<CategoriesResponseArrayData>;
}
