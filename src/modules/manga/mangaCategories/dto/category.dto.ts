import { ApiProperty } from '@nestjs/swagger';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ResponseArrayData } from 'src/shared/types/pagination';

export class CategoryDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export class CategoriesResponseArrayData extends ResponseArrayData<CategoryDto> {
    @ApiProperty({ type: [CategoryDto] })
    data: CategoryDto[];
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
