import { MangaTypeEnum } from 'src/modules/book/_common/types/mangaType';
import { getMutateBookSchema, getParseBodyMutateBook } from '../../__common/dto/mutateBook.dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiHideProperty } from '@nestjs/swagger';

const MutateMangaSchema = getMutateBookSchema(MangaTypeEnum);
const ParseBodyMutateMangaSchema = getParseBodyMutateBook(MutateMangaSchema);

export class MutateMangaDto extends createZodDto(MutateMangaSchema) {
    @ApiHideProperty()
    banner?: string;
}
export class ParseBodyMutateMangaDto extends createZodDto(ParseBodyMutateMangaSchema) {}
