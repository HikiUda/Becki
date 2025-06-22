import { MangaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/types/pagination';
import { CatalogBookDto } from './catalogBook.dto';

export class CatalogMangaDto extends CatalogBookDto<MangaType> {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class CatalogMangaListDto extends Pagination<CatalogMangaDto> {
    @ApiProperty({ type: [CatalogMangaDto] })
    data: CatalogMangaDto[];
}
