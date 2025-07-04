import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/shared/dto/langQuery.dto';
import { PaginationQueryScheme } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedBookChapterListItem {
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
    publish: boolean;
}

export class EditedBookChapterList extends Pagination<EditedBookChapterListItem> {
    @ApiProperty({ type: [EditedBookChapterListItem] })
    data: EditedBookChapterListItem[];
}

export const EditedBookChapterListQuerySchema = z
    .object({
        search: z.string().default(''),
        order: z.enum(['asc', 'desc']).default('desc'),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme);

export class EditedBookChapterListQuery extends createZodDto(EditedBookChapterListQuerySchema) {}
