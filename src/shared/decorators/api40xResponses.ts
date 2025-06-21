import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiProperty,
} from '@nestjs/swagger';

class ErrorType {
    @ApiProperty()
    message: string;
    @ApiProperty()
    statusCode: number;
    @ApiProperty({ required: false })
    error?: string;
}

export function ApiCustomUnauthorizedResponse() {
    return applyDecorators(
        ApiUnauthorizedResponse({
            type: ErrorType,
            description: 'Unauthorized',
        }),
    );
}
export function ApiCustomBadRequestResponse() {
    return applyDecorators(
        ApiBadRequestResponse({
            type: ErrorType,
            description: 'Bad Request',
        }),
    );
}
export function ApiCustomNotFoundResponse() {
    return applyDecorators(
        ApiNotFoundResponse({
            type: ErrorType,
            description: 'Resource not found',
        }),
    );
}
