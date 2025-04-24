import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto } from '../../../dto/category.dto';

export interface MangaTagsServiceInterface {
    getTags: (search: string, lang: LangType) => Promise<CategoryDto[]>;
}
