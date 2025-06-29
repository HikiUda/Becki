import { getMutateBookSchema, getParseBodyMutateBook } from '../../__common/dto/mutateBook.dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiHideProperty } from '@nestjs/swagger';
import { RanobeTypeEnum } from 'src/modules/book/_common/types/ranobeType';

const MutateRanobeSchema = getMutateBookSchema(RanobeTypeEnum.optional());
const ParseBodyMutateRanobeSchema = getParseBodyMutateBook(MutateRanobeSchema);

export class MutateRanobeDto extends createZodDto(MutateRanobeSchema) {
    @ApiHideProperty()
    banner?: string;
}
export class ParseBodyMutateRanobeDto extends createZodDto(ParseBodyMutateRanobeSchema) {}
