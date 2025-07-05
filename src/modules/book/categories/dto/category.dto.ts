import { ApiProperty } from '@nestjs/swagger';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export class CategoryDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export class CategoryDtoList extends ResponseArrayData<CategoryDto> {
    @ApiProperty({ type: [CategoryDto] })
    data: CategoryDto[];
}

export function toCategoryDto(
    categories: { id: number; ru: string; en: string | null }[],
    lang: Lang,
): CategoryDto[] {
    return categories.map((category) => ({
        id: category.id,
        title: category[lang] || category.ru,
    }));
}
