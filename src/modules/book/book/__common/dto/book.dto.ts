import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '@prisma/client';
import { AgeRating } from 'src/modules/book/_common/model/ageRating';
import { UserBaseDto } from 'src/modules/user/profile/dto/userBase.dto';

export class BookTitle {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    origin: string | null;
}

export class BookCategory {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export abstract class Book {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: BookTitle;

    @ApiProperty()
    otherTitles: string[];

    @ApiProperty()
    description: string;

    @ApiProperty()
    rate: number;

    @ApiProperty()
    rateCount: number;

    @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
    releaseDate: Date | null;

    @ApiProperty({ enum: AgeRating })
    ageRating: AgeRating;

    @ApiProperty({ enum: BookStatus })
    status: BookStatus;

    abstract type: string;

    @ApiProperty({ type: [BookCategory] })
    genres: BookCategory[];

    @ApiProperty({ type: [BookCategory] })
    tags: BookCategory[];

    @ApiProperty({ type: 'string', nullable: true })
    cover: string | null;

    @ApiProperty({ type: 'string', nullable: true })
    banner: string | null;

    @ApiProperty()
    owner: UserBaseDto;
}
