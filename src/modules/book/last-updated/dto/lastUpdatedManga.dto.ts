import { MangaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/types/pagination';
import { LastUpdatedBookDto } from './lastUpdatedBook.dto';

export class LastUpdatedMangaDto extends LastUpdatedBookDto<MangaType> {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class LastUpdatedMangaListDto extends Pagination<LastUpdatedMangaDto> {
    @ApiProperty({ type: [LastUpdatedMangaDto] })
    data: LastUpdatedMangaDto[];
}
