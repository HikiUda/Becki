import { RanobeType } from '@prisma/client';
import { EditedBook } from '../../__common/dto/editedBook.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedRanobe extends EditedBook {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}
