import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UserMangaRateDto {
    @ApiProperty({ type: 'number', nullable: true })
    rate: number | null;
    @ApiProperty()
    mangaId: number;
    @ApiProperty()
    userId: number;
}

const SetUserMangaRateScheme = z.object({
    rate: z.number().int().min(0).max(10),
});
export class SetUserMangaRateDto extends createZodDto(SetUserMangaRateScheme) {}
