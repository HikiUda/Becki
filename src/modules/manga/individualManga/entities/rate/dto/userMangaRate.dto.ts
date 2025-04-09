import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export interface UserMangaRateDto {
    rate: number | null;
    mangaId: number;
    userId: number;
}

const SetUserMangaRateScheme = z.object({
    rate: z.number().int().min(0).max(10),
});
export class SetUserMangaRateDto extends createZodDto(SetUserMangaRateScheme) {}
