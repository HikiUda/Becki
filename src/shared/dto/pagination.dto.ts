import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';

export const PaginationQueryScheme = z.object({
    page: z.coerce.number().int().default(1),
    limit: z.coerce.number().min(1).default(10),
});
export class PaginationQuery extends createZodDto(PaginationQueryScheme) {}

export abstract class ResponseArrayData<T> {
    abstract data: T[];
}

export abstract class Pagination<T> extends ResponseArrayData<T> {
    @ApiProperty({ type: 'number', nullable: true })
    prevPage: number | null;
    @ApiProperty({ type: 'number', nullable: true })
    nextPage: number | null;
}

export function getPagination(count: number, page: number, limit: number) {
    return {
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextPage: count - limit * page > 0 ? page + 1 : null,
    };
}
