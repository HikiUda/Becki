import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { fromNotGreetThenTo, validInteger } from './validationFunction';

export function validateChapterCount(valideQuery: MangaListQuery, query: MangaListGetQuery) {
    if (query.chapterCountFrom) {
        valideQuery.chapterCountFrom = validInteger(query.chapterCountFrom, 'chapterCountFrom');
    }
    if (query.chapterCountTo) {
        valideQuery.chapterCountTo = validInteger(query.chapterCountTo, 'chapterCountTo');
    }
    if (valideQuery.chapterCountFrom && valideQuery.chapterCountTo)
        fromNotGreetThenTo(
            valideQuery.chapterCountFrom,
            valideQuery.chapterCountTo,
            'chapterCount',
        );
}
