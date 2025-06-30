import { MangaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/types/pagination';
import { LastUpdatedBook } from './lastUpdatedBook.dto';

export class LastUpdatedManga extends LastUpdatedBook {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class LastUpdatedMangaList extends Pagination<LastUpdatedManga> {
    @ApiProperty({ type: [LastUpdatedManga] })
    data: LastUpdatedManga[];
}
