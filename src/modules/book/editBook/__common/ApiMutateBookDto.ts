import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiExtraModels,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';

export function ApiMutateBookDto(
    mutateBookDto: any,
    editedBookDto: any,
    withCover: boolean = true,
) {
    return applyDecorators(
        ApiExtraModels(mutateBookDto),
        ApiConsumes('multipart/form-data'),
        ApiOkResponse({ type: editedBookDto }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    ...(withCover && {
                        covers: {
                            type: 'string',
                            format: 'binary',
                            description: '1 обложка (формат — файл)',
                        },
                    }),
                    banner: {
                        type: 'string',
                        format: 'binary',
                        description: '1 баннер (формат — файл)',
                    },
                    body: {
                        $ref: getSchemaPath(mutateBookDto),
                        description: 'In JSON.stringfy format',
                    },
                },
            },
        }),
    );
}
