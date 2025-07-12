import { ApiProperty } from '@nestjs/swagger';

class NeighbourBookChapter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chapter: number;
}

export class BookChapter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    tome: number;
    @ApiProperty()
    chapter: number;

    @ApiProperty({ type: 'string', nullable: true })
    title: string | null;
    @ApiProperty()
    bookTitle: string;

    @ApiProperty({ type: NeighbourBookChapter, nullable: true })
    prevChapter: NeighbourBookChapter | null;
    @ApiProperty({ type: NeighbourBookChapter, nullable: true })
    nextChapter: NeighbourBookChapter | null;

    // ? is really need in isUserLiked. Possible delete
    @ApiProperty()
    isUserLiked: boolean;
    @ApiProperty()
    isUserViewed: boolean;
}
