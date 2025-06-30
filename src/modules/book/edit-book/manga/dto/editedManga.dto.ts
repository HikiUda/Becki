import { MangaType } from '@prisma/client';
import { EditedBook } from '../../__common/dto/editedBook.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedManga extends EditedBook {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}
