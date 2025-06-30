import { RanobeType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/types/pagination';
import { CatalogBook } from './catalogBook.dto';

export class CatalogRanobe extends CatalogBook {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}

export class CatalogRanobeList extends Pagination<CatalogRanobe> {
    @ApiProperty({ type: [CatalogRanobe] })
    data: CatalogRanobe[];
}
