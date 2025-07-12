import { Prisma } from '@prisma/client';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export const getUpdateChapterInput = (dto: MutateBookChapterDto) => {
    return {
        title: dto.title,
        tome: dto.tome,
        chapter: dto.chapter,
    } satisfies Prisma.BookChaptersUpdateInput;
};
