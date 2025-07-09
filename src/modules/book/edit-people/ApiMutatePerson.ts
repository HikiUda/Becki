import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiMutatePerson(mutateDto: any) {
    return applyDecorators(
        ApiExtraModels(mutateDto),
        ApiConsumes('multipart/form-data'),
        ApiResponse({ status: 204 }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    avatar: {
                        type: 'string',
                        format: 'binary',
                        description: '1 аватар (формат — файл)',
                    },
                    body: {
                        $ref: getSchemaPath(mutateDto),
                        description: 'In JSON.stringfy format',
                    },
                },
                required: ['body'],
            },
        }),
    );
}
