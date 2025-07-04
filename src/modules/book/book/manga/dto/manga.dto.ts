import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../__common/dto/book.dto';
import { MangaType } from '@prisma/client';

export class Manga extends Book {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}
