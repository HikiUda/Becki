import { ApiProperty } from '@nestjs/swagger';
import { ResponseArrayData } from 'src/shared/dto/pagination.dto';

export class QuickSearchLastList extends ResponseArrayData<string> {
    @ApiProperty()
    data: string[];
}
