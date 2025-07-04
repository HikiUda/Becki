import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export class BookCover {
    @ApiProperty()
    id: number;
    @ApiProperty()
    cover: string;
}

export class BookCoverList extends ResponseArrayData<BookCover> {
    @ApiProperty({ type: [BookCover] })
    data: BookCover[];
}
