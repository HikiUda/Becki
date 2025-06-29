import { Prisma } from '@prisma/client';
import { MutateBookChapterDto } from '../dto/mutateChapter.dto';

export const getUpdateChapterInput = (dto: MutateBookChapterDto) => {
    return {
        title: {
            update: {
                ru: dto.title?.ru,
                en: dto.title?.en,
            },
        },
        tome: dto.tome,
        chapter: dto.chapter,
        private: dto.private,
    } satisfies Prisma.BookChaptersUpdateInput;
};
