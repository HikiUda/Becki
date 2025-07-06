import { ApiProperty } from '@nestjs/swagger';

export class UserLikeBookChapterDto {
    @ApiProperty()
    isLiked: boolean;
    @ApiProperty()
    likeCount: number;
}
