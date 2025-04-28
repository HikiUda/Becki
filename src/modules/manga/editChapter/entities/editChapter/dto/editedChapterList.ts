import { createZodDto } from '@anatine/zod-nestjs';
import { LangQueryScheme } from 'src/common/dto/query/langQuery.dto';
import { OrderQueryScheme } from 'src/common/dto/query/orderQuery';
import { PaginationQueryScheme } from 'src/common/dto/query/pagination.dto';
import { z } from 'zod';

import { Pagination } from 'src/common/types/pagination';

export interface EditedChapterListItemDto {
    id: number;
    tome: number;
    chapter: number;
    title: string | null;
    createdAt: Date;
    private: boolean;
}

export type EditedChapterListPagination = Pagination<EditedChapterListItemDto>;

export const EditedChapterListQueryScheme = z
    .object({
        search: z.string().default(''),
    })
    .merge(LangQueryScheme)
    .merge(PaginationQueryScheme)
    .merge(OrderQueryScheme);

export class EditedChapterListQuery extends createZodDto(EditedChapterListQueryScheme) {}
