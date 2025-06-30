import { ResponseArrayData } from 'src/shared/types/pagination';
import { ApiProperty } from '@nestjs/swagger';
import { QuickSearchBook } from '../../__common/dto/quickSearchBook.dto';
import { RanobeType } from '@prisma/client';

export class QuickSearchRanobe extends QuickSearchBook {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}

export class QuickSearchRanobeList extends ResponseArrayData<QuickSearchRanobe> {
    @ApiProperty({ type: [QuickSearchRanobe] })
    data: QuickSearchRanobe[];
}
