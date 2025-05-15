import { ApiProperty } from '@nestjs/swagger';
import { Bookmarks } from '@prisma/client';

export class UserMangaBookmarkDto {
    @ApiProperty()
    mangaId: number;
    @ApiProperty()
    userId: number;
    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;
}
