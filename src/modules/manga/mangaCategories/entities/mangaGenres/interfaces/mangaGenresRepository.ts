import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { CategoriesResponseArrayData } from '../../../dto/category.dto';

export interface MangaGenresRepositoryInterface {
    getGenres: (search: string, lang: LangType) => Promise<CategoriesResponseArrayData>;
}
