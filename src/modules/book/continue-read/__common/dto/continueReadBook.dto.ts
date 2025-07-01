import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { LangQueryScheme } from 'src/shared/dto/query/langQuery.dto';
import { ResponseArrayData } from 'src/shared/types/pagination';
import { z } from 'zod';

export class ContinueReadBook {
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

export class ContinueReadBookList extends ResponseArrayData<ContinueReadBook> {
    @ApiProperty({ type: [ContinueReadBook] })
    data: ContinueReadBook[];
}

const ContinueReadBookQuerySchema = z
    .object({
        limit: z.number().int().default(10),
    })
    .merge(LangQueryScheme);
export class ContinueReadBookQuery extends createZodDto(ContinueReadBookQuerySchema) {}
