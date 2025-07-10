import { ApiProperty } from '@nestjs/swagger';
import { BookStatus, PeopleRole } from '@prisma/client';
import { AgeRating } from 'src/modules/book/_common/model/ageRating';

export class EditedBookTitle {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    origin: string | null;
}

export class EditedBookDescription {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
}

export class EditedBookCategory {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export class EditedBookPerson {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: 'string', nullable: true })
    avatar: string | null;
}

export abstract class EditedBook {
    @ApiProperty()
    id: number;

    @ApiProperty()
    urlId: string;

    @ApiProperty()
    title: EditedBookTitle;

    @ApiProperty({ type: String, isArray: true })
    otherTitles: string[];

    @ApiProperty()
    description: EditedBookDescription;

    @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
    releaseDate: Date | null;

    @ApiProperty({ enum: BookStatus })
    status: BookStatus;

    abstract type: string;

    @ApiProperty({ type: [EditedBookCategory] })
    genres: EditedBookCategory[];

    @ApiProperty({ type: [EditedBookCategory] })
    tags: EditedBookCategory[];

    @ApiProperty({ type: 'string', nullable: true })
    banner: string | null;

    @ApiProperty({ enum: AgeRating })
    ageRating: AgeRating;

    @ApiProperty()
    authors: EditedBookPerson[];

    @ApiProperty()
    artists: EditedBookPerson[];

    @ApiProperty()
    publishers: EditedBookPerson[];
}
