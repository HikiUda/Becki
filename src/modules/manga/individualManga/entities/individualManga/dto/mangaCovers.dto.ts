import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/types/pagination';

export class MangaCoverDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    cover: string;
}

export class MangaCoverArrayData extends ResponseArrayData<MangaCoverDto> {
    @ApiProperty({ type: [MangaCoverDto] })
    data: MangaCoverDto[];
}
