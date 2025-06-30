import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiMutateBookDto(mutateBookDto: any, withCover: boolean = true) {
    return applyDecorators(
        ApiExtraModels(mutateBookDto),
        ApiConsumes('multipart/form-data'),
        ApiResponse({ status: 204 }),
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
