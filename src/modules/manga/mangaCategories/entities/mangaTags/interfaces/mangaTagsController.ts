import { CategoryDto } from '../../../dto/category.dto';
import { GetCategoryQuery } from '../../../dto/getCategoryQuery';

export interface MangaTagsControllerInterface {
    getTags: (query: GetCategoryQuery) => Promise<CategoryDto[]>;
}
