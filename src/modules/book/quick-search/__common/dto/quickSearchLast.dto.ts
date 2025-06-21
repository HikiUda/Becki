import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/types/pagination';

export class QuickSearchLastDto extends ResponseArrayData<string> {
    @ApiProperty()
    data: string[];
}
