import { MangaType } from '@prisma/client';
import { EditedBookDto } from '../../__common/dto/editedBook.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedMangaDto extends EditedBookDto {
    @ApiProperty({ enum: MangaType })
    type: MangaType;
}
