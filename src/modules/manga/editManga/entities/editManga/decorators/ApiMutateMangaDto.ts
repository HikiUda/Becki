import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiExtraModels,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';

export function ApiMutateMangaDto(withCover: boolean = true) {
    return applyDecorators(
        ApiExtraModels(MutateMangaDto),
        ApiConsumes('multipart/form-data'),
        ApiOkResponse({ type: EditedMangaDto }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    ...(withCover && {
                        covers: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'binary',
                            },
                            description: '1 обложка (формат — файл)',
                        },
                    }),
                    banner: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description: '1 баннер (формат — файл)',
                    },
                    body: { $ref: getSchemaPath(MutateMangaDto) },
                },
            },
        }),
    );
}
