import { ResponseArrayData } from 'src/shared/types/pagination';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class MangaListItemContinueReadDto extends PickType(MangaListItemBaseDto, [
    'id',
    'urlId',
    'title',
    'chapter',
    'chapterCount',
    'tome',
    'readedChapters',
    'cover',
    'chapterId',
] as const) {}

export class MangaListItemContinueReadResponseArrayData extends ResponseArrayData<MangaListItemContinueReadDto> {
    @ApiProperty({ type: [MangaListItemContinueReadDto] })
    data: MangaListItemContinueReadDto[];
}
