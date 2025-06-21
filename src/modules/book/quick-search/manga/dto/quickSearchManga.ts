import { ResponseArrayData } from 'src/shared/types/pagination';
import { ApiProperty } from '@nestjs/swagger';
import { QuickSearchBookDto } from '../../__common/dto/quickSearchBook.dto';
import { MangaType } from '@prisma/client';

export class QuickSearchMangaDto extends QuickSearchBookDto<MangaType> {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class QuickSearchMangaListDto extends ResponseArrayData<QuickSearchMangaDto> {
    @ApiProperty({ type: [QuickSearchMangaDto] })
    data: QuickSearchMangaDto[];
}
