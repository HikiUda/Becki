import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto } from '../../../dto/category.dto';

export interface MangaGenresRepositoryInterface {
    getGenres: (search: string, lang: LangType) => Promise<CategoryDto[]>;
}
