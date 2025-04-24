import { LangType } from 'src/common/dto/query/langQuery.dto';

export interface CategoryDto {
    id: number;
    title: string;
}

export function toCategoriesDto(
    categories: { id: number; ru: string; en: string | null }[],
    lang: LangType,
): CategoryDto[] {
    return categories.map((category) => ({
        id: category.id,
        title: category[lang] || category.ru,
    }));
}
