import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { LangQueryScheme } from 'src/shared/dto/langQuery.dto';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

export class ContinueReadBookListItem {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    cover: string;

    @ApiProperty()
    tome: number;

    @ApiProperty()
    chapter: number;

    @ApiProperty()
    chapterId: number;
}

export class ContinueReadBookList extends ResponseArrayData<ContinueReadBookListItem> {
    @ApiProperty({ type: [ContinueReadBookListItem] })
    data: ContinueReadBookListItem[];
}

const ContinueReadBookListQuerySchema = z
    .object({
        limit: z.number().int().default(10),
    })
    .merge(LangQueryScheme);
export class ContinueReadBookListQuery extends createZodDto(ContinueReadBookListQuerySchema) {}
