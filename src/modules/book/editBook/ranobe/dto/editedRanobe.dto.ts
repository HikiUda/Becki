import { RanobeType } from '@prisma/client';
import { EditedBookDto } from '../../__common/dto/editedBook.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedRanobeDto extends EditedBookDto {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}
