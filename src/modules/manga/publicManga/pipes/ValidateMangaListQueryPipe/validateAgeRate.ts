import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem.dto';
import { fromNotGreetThenTo, validInteger } from './validationFunction';

export function validateAgeRate(valideQuery: MangaListQuery, query: MangaListGetQuery) {
    if (query.ageRateFrom) {
        valideQuery.ageRateFrom = validInteger(query.ageRateFrom, 'ageRateFrom');
    }
    if (query.ageRateTo) {
        valideQuery.ageRateTo = validInteger(query.ageRateTo, 'ageRateTo');
    }
    if (valideQuery.ageRateFrom && valideQuery.ageRateTo)
        fromNotGreetThenTo(valideQuery.ageRateFrom, valideQuery.ageRateTo, 'ageRate');
}
