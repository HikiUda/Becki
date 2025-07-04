import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export class EditedBookCover {
    @ApiProperty()
    id: number;
    @ApiProperty()
    cover: string;
    @ApiProperty()
    main: boolean;
}

export class EditedBookCoverList extends ResponseArrayData<EditedBookCover> {
    @ApiProperty({ type: [EditedBookCover] })
    data: EditedBookCover[];
}
