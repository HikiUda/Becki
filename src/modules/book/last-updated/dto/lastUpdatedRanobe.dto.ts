import { RanobeType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/shared/dto/pagination.dto';
import { LastUpdatedBook } from './lastUpdatedBook.dto';

export class LastUpdatedRanobe extends LastUpdatedBook {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}

export class LastUpdatedRanobeList extends Pagination<LastUpdatedRanobe> {
    @ApiProperty({ type: [LastUpdatedRanobe] })
    data: LastUpdatedRanobe[];
}
