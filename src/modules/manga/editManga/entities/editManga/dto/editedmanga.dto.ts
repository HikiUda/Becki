import { MangaStatus, MangaType } from '@prisma/client';
import { EditedMangaCover } from '../../editMangaCover/dto/editedMangaCover.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditedMangaTitle {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    origin: string | null;
}
export class EditedMangaOtherTitles {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export class EditedMangaDescription {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
}

export class EditedMangaGenresAndTags {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}
export class EditedMangaAuthors {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
}

export class EditedMangaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    urlId: string;
    @ApiProperty()
    title: EditedMangaTitle;
    @ApiProperty({ type: [EditedMangaOtherTitles] })
    otherTitles: EditedMangaOtherTitles[];
    @ApiProperty()
    description: EditedMangaDescription;
    @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
    releaseDate: Date | null;
    @ApiProperty({ enum: MangaStatus })
    status: MangaStatus;
    @ApiProperty({ enum: MangaType })
    type: MangaType;
    @ApiProperty({ type: [EditedMangaGenresAndTags] })
    genres: EditedMangaGenresAndTags[];
    @ApiProperty({ type: [EditedMangaGenresAndTags] })
    tags: EditedMangaGenresAndTags[];
    @ApiProperty({ type: [EditedMangaCover] })
    covers: EditedMangaCover[];
    @ApiProperty({ type: 'string', nullable: true })
    banner: string | null;
    @ApiProperty()
    ageRate: number;
    @ApiProperty({ type: [EditedMangaAuthors] })
    authors: EditedMangaAuthors[];
    @ApiProperty({ type: [EditedMangaAuthors] })
    artists: EditedMangaAuthors[];
    @ApiProperty({ type: [EditedMangaAuthors] })
    publishers: EditedMangaAuthors[];
}
