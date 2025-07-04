import { ApiProperty } from '@nestjs/swagger';
import { BookStatus, MangaType, RanobeType } from '@prisma/client';
import { BookRelationship } from '../bookRelated';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export abstract class RelatedBookDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ enum: { ...MangaType, ...RanobeType } })
    type: MangaType | RanobeType;

    @ApiProperty()
    cover: string;

    @ApiProperty({ enum: BookStatus })
    status: BookStatus;

    @ApiProperty({ enum: BookRelationship })
    relationship: BookRelationship;

    @ApiProperty()
    relatedId: string;
}

export class RelatedBookDtoList extends ResponseArrayData<RelatedBookDto> {
    @ApiProperty({ type: [RelatedBookDto] })
    data: RelatedBookDto[];
}
