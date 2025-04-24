import { LangType } from 'src/common/dto/query/langQuery.dto';
import { CategoryDto } from '../../../dto/category.dto';

export interface MangaGenresServiceInterface {
    getGenres: (search: string, lang: LangType) => Promise<CategoryDto[]>;
}
