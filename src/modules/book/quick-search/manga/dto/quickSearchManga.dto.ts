import { ResponseArrayData } from 'src/shared/types/pagination';
import { ApiProperty } from '@nestjs/swagger';
import { QuickSearchBook } from '../../__common/dto/quickSearchBook.dto';
import { MangaType } from '@prisma/client';

export class QuickSearchManga extends QuickSearchBook {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class QuickSearchMangaList extends ResponseArrayData<QuickSearchManga> {
    @ApiProperty({ type: [QuickSearchManga] })
    data: QuickSearchManga[];
}
