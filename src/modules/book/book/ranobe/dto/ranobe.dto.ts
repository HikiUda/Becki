import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../__common/dto/book.dto';
import { RanobeType } from '@prisma/client';

export class Ranobe extends Book {
    @ApiProperty({ enum: RanobeType })
    type: RanobeType;
}
