import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export function ApiMangaIdParam(name = 'id', description = 'urlId or just id') {
    return applyDecorators(
        ApiParam({
            name,
            description,
            required: true,
            type: String,
        }),
    );
}
