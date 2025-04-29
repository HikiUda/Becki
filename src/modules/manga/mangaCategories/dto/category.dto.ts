import { LangType } from 'src/common/dto/query/langQuery.dto';
import { ResponseArrayData } from 'src/common/types/pagination';

export interface CategoryDto {
    id: number;
    title: string;
}

export type CategoriesResponseArrayData = ResponseArrayData<CategoryDto>;

export function toCategoriesDto(
    categories: { id: number; ru: string; en: string | null }[],
    lang: LangType,
): CategoryDto[] {
    return categories.map((category) => ({
        id: category.id,
        title: category[lang] || category.ru,
    }));
}
