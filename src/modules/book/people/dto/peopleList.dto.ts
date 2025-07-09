import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { PeopleRole } from '@prisma/client';
import { Pagination, PaginationQuerySchema } from 'src/shared/dto/pagination.dto';
import { z } from 'zod';

export class PeopleListItem {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
}

export class PeopleList extends Pagination<PeopleListItem> {
    @ApiProperty({ type: [PeopleListItem] })
    data: PeopleListItem[];
}

const PeopleListQuerySchema = z
    .object({
        search: z.string().default(''),
        role: z.nativeEnum(PeopleRole).optional(),
    })
    .merge(PaginationQuerySchema);
export class PeopleListQuery extends createZodDto(PeopleListQuerySchema) {}
