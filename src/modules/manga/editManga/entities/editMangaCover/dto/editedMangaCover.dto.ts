import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/types/pagination';

export class EditedMangaCover {
    @ApiProperty()
    id: number;
    @ApiProperty()
    cover: string;
    @ApiProperty()
    main: boolean;
}

export class EditedMangaCoverResponseArrayData extends ResponseArrayData<EditedMangaCover> {
    @ApiProperty({ type: [EditedMangaCover] })
    data: EditedMangaCover[];
}
