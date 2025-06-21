import { ResponseArrayData } from 'src/shared/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class MangaListItemStatisticDto extends PickType(MangaListItemBaseDto, [
    'id',
    'urlId',
    'title',
    'type',
    'cover',
    'views',
    'likes',
    'bookmarks',
] as const) {}

export class MangaListItemStatisticResponseArrayData extends ResponseArrayData<MangaListItemStatisticDto> {
    @ApiProperty({ type: [MangaListItemStatisticDto] })
    data: MangaListItemStatisticDto[];
}
