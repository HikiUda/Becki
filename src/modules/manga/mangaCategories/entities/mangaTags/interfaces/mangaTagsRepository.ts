import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoriesResponseArrayData } from '../../../dto/category.dto';

export interface MangaTagsRepositoryInterface {
    getTags: (search: string, lang: LangType) => Promise<CategoriesResponseArrayData>;
}
