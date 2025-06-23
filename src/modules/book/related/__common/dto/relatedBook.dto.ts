import { ApiProperty } from '@nestjs/swagger';
import { BookStatus, MangaType } from '@prisma/client';
import { BookRelationship } from '../bookRelated';
import { ResponseArrayData } from 'src/shared/types/pagination';

export abstract class RelatedBookDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: MangaType })
    type: MangaType;

    @ApiProperty()
    cover: string;

    @ApiProperty({ enum: [BookStatus] })
    status: BookStatus;

    @ApiProperty({ enum: [BookRelationship] })
    relationship: BookRelationship;
}

export class RelatedBookListDto extends ResponseArrayData<RelatedBookDto> {
    @ApiProperty({ type: [RelatedBookDto] })
    data: RelatedBookDto[];
}
