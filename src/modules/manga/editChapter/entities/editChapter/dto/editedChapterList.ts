import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/common/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/common/dto/query/pagination.dto';
import { z } from 'zod';

import { Pagination } from 'src/common/types/pagination';
import { ApiProperty } from '@nestjs/swagger';

export class EditedChapterListItemDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chapter: number;
    @ApiProperty({ type: 'string', nullable: true })
    title: string | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    private: boolean;
}

export class EditedChapterListPagination extends Pagination<EditedChapterListItemDto> {
    @ApiProperty({ type: [EditedChapterListItemDto] })
    data: EditedChapterListItemDto[];
}

export const EditedChapterListQueryScheme = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(OrderQueryScheme);

export class EditedChapterListQuery extends createZodDto(EditedChapterListQueryScheme) {}
