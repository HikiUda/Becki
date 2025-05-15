import { ApiProperty } from '@nestjs/swagger';
import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';
import { UserBaseDto } from 'src/modules/user/profile/dto/userBase.dto';

export class MangaTitle {
    @ApiProperty()
    ru: string;
    @ApiProperty({ type: 'string', nullable: true })
    en: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    origin: string | null;
}

export class MangaGenresAndTag {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
}

export class MangaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    urlId: string;
    @ApiProperty()
    title: MangaTitle;
    @ApiProperty()
    otherTitles: string[];
    @ApiProperty()
    description: string;
    @ApiProperty()
    chaptersCount: number;
    @ApiProperty()
    rate: number;
    @ApiProperty()
    countRate: number;
    @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
    releaseDate: Date | null;
    @ApiProperty({ enum: MangaStatus })
    status: MangaStatus;
    @ApiProperty({ enum: MangaType })
    type: MangaType;
    @ApiProperty({ type: [MangaGenresAndTag] })
    genres: MangaGenresAndTag[];
    @ApiProperty({ type: [MangaGenresAndTag] })
    tags: MangaGenresAndTag[];
    @ApiProperty({ type: 'string', nullable: true })
    cover: string | null;
    @ApiProperty({ type: 'string', nullable: true })
    banner: string | null;
    @ApiProperty()
    owner: UserBaseDto;
    @ApiProperty()
    authors: string[];
    @ApiProperty()
    artists: string[];
    @ApiProperty()
    publishers: string[];
    @ApiProperty({ enum: Bookmarks, nullable: true })
    bookmark: Bookmarks | null;
}
