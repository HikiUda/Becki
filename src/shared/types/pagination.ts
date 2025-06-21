import { ApiProperty } from '@nestjs/swagger';

export abstract class ResponseArrayData<T> {
    abstract data: T[];
}

export abstract class Pagination<T> extends ResponseArrayData<T> {
    @ApiProperty({ type: 'number', nullable: true })
    prevPage: number | null;
    @ApiProperty({ type: 'number', nullable: true })
    nextPage: number | null;
}
