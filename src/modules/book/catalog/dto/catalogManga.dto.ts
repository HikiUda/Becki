import { MangaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/types/pagination';
import { CatalogBook } from './catalogBook.dto';

export class CatalogManga extends CatalogBook {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}

export class CatalogMangaList extends Pagination<CatalogManga> {
    @ApiProperty({ type: [CatalogManga] })
    data: CatalogManga[];
}
