import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { AddPageResponse } from './dto/addPageResponse.dto';

export function ApiAddPage() {
    return applyDecorators(
        ApiConsumes('multipart/form-data'),
        ApiOkResponse({ type: AddPageResponse }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    page: {
                        type: 'string',
                        format: 'binary',
                        description: '1 страница (формат — файл)',
                    },
                },
                required: ['page'],
            },
        }),
    );
}
