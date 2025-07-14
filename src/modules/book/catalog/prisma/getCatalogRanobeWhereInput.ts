import { Prisma } from '@prisma/client';
import { getSearch } from './book/whereInput/search';
import { getStatus } from './book/whereInput/status';
import { getBookmarks } from './book/whereInput/bookmarks';
import { getGenres, getNotGenres, getNotTags, getTags } from './book/whereInput/categories';
import { getAgeRating } from './book/whereInput/ageRating';
import { getReleaseDateFrom, getReleaseDateTo } from './book/whereInput/releaseDate';
import { getRateFrom, getRateTo } from './book/whereInput/rate';
import { getRateCountFrom, getRateCountTo } from './book/whereInput/rateCount';
import { getChapterCountFrom, getChapterCountTo } from './book/whereInput/chapterCount';
import { getRanobeType } from './book/whereInput/ranobeType';
import { CatalogRanobeQuery } from '../dto/catalogRanobeQuery.dto';
import { UserId } from 'src/modules/authorization';
import { getPeople } from './book/whereInput/people';
import { getBookLang } from './book/whereInput/lang';

export const getCatalogRanobeWhereInput = (
    query: CatalogRanobeQuery,
    userId?: UserId,
): Prisma.RanobeWhereInput => {
    const where: Prisma.RanobeWhereInput = {};
    const AND: Prisma.RanobeWhereInput[] = [];

    if (query.search) AND.push(getSearch(query.search));
    if (query.status.length) AND.push(getStatus(query.status));
    if (query.type.length) AND.push(getRanobeType(query.type));
    if (query.bookmarks.length && userId) AND.push(getBookmarks(query.bookmarks, userId));
    if (query.ageRating.length) AND.push(getAgeRating(query.ageRating));

    // Categories
    if (query.genres.length) AND.push(getGenres(query.genres));
    if (query.notGenres.length) AND.push(getNotGenres(query.notGenres));
    if (query.tags.length) AND.push(getTags(query.tags));
    if (query.notTags.length) AND.push(getNotTags(query.notTags));

    // By releaseDate
    if (query.releaseDateFrom) AND.push(getReleaseDateFrom(query.releaseDateFrom));
    if (query.releaseDateTo) AND.push(getReleaseDateTo(query.releaseDateTo));

    // By Rate
    if (query.rateFrom) AND.push(getRateFrom(query.rateFrom));
    if (query.rateTo) AND.push(getRateTo(query.rateTo));

    // By rateCount
    if (query.rateCountFrom) AND.push(getRateCountFrom(query.rateCountFrom));
    if (query.rateCountTo) AND.push(getRateCountTo(query.rateCountTo));

    // By chapterCount
    if (query.chapterCountFrom) AND.push(getChapterCountFrom(query.chapterCountFrom));
    if (query.chapterCountTo) AND.push(getChapterCountTo(query.chapterCountTo));

    // By People
    if (query.person) AND.push(getPeople(query.person));

    // By BookLang
    if (query.bookLang) AND.push(getBookLang(query.bookLang));

    where.AND = AND;
    return where;
};
