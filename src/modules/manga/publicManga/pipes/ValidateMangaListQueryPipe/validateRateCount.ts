import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { fromNotGreetThenTo, validInteger } from './validationFunction';

export function validateRateCount(valideQuery: MangaListQuery, query: MangaListGetQuery) {
    if (query.rateCountFrom) {
        valideQuery.rateCountFrom = validInteger(query.rateCountFrom, 'rateCountFrom');
    }
    if (query.rateCountTo) {
        valideQuery.rateCountTo = validInteger(query.rateCountTo, 'rateCountTo');
    }
    if (valideQuery.rateCountFrom && valideQuery.rateCountTo)
        fromNotGreetThenTo(valideQuery.rateCountFrom, valideQuery.rateCountTo, 'rateCount');
}
