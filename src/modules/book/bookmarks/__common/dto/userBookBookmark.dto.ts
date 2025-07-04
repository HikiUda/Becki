import { ApiProperty } from '@nestjs/swagger';
import { Bookmarks } from '@prisma/client';

export class UserBookBookmark {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    bookId: number;
    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;
}
