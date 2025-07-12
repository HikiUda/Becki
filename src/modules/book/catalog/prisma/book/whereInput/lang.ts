import { WhereInputType } from './whereInput.type';
import { BookLang } from '@prisma/client';

export const getBookLang = (lang: BookLang) => {
    return {
        lang,
    } satisfies WhereInputType;
};
