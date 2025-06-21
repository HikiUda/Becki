import { Pagination } from 'src/shared/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class MangaListItemDto extends PickType(MangaListItemBaseDto, [
    'id',
    'urlId',
    'title',
    'chapterCount',
    'bookmark',
    'rate',
    'cover',
    'type',
] as const) {}

export class MangaListItemPagination extends Pagination<MangaListItemDto> {
    @ApiProperty({ type: [MangaListItemDto] })
    data: MangaListItemDto[];
}
