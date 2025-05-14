import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/common/types/pagination';

export class QuickSearchLastDto extends ResponseArrayData<string> {
    @ApiProperty()
    data: string[];
}
