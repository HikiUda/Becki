import { ApiProperty, PickType } from '@nestjs/swagger';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { Pagination } from 'src/common/types/pagination';

export class MangaListItemLastUpdatedDto extends PickType(MangaListItemBaseDto, [
    'id',
    'urlId',
    'title',
    'type',
    'cover',
    'tome',
    'chapter',
    'chapterCreatedAt',
    'chapterId',
] as const) {}

export class MangaListItemLastUpdatedPagination extends Pagination<MangaListItemLastUpdatedDto> {
    @ApiProperty({ type: [MangaListItemLastUpdatedDto] })
    data: MangaListItemLastUpdatedDto[];
}
