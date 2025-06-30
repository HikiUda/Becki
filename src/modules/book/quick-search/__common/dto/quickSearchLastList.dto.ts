import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/types/pagination';

export class QuickSearchLastList extends ResponseArrayData<string> {
    @ApiProperty()
    data: string[];
}
