import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

export function ApiAddCovers() {
    return applyDecorators(
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    covers: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description: 'До 5 изображений обложек (формат — файл)',
                    },
                },
            },
        }),
        ApiResponse({ status: 204 }),
    );
}
