import { createZodDto } from '@anatine/zod-nestjs';
import { MangaChapterId, RanobeChapterId } from 'src/modules/book/_common/model/bookId';
import { BookmarksEnum } from 'src/modules/book/_common/model/book';
import { z } from 'zod';

const AddMangaBookmarkSchema = z.object({
    bookmark: BookmarksEnum,
    chapterId: MangaChapterId.nullable().default(null),
});
const AddRanobeBookmarkSchema = z.object({
    bookmark: BookmarksEnum,
    chapterId: RanobeChapterId.nullable().default(null),
});

export class AddMangaBookmarkDto extends createZodDto(AddMangaBookmarkSchema) {}
export class AddRanobeBookmarkDto extends createZodDto(AddRanobeBookmarkSchema) {}
export type AddBookBookmarkDto = AddMangaBookmarkDto | AddRanobeBookmarkDto;
