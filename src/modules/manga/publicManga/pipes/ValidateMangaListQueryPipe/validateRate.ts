import { NotAcceptableException } from '@nestjs/common';
import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { fromNotGreetThenTo, validInteger } from './validationFunction';

export function validateRate(valideQuery: MangaListQuery, query: MangaListGetQuery) {
    if (query.rateFrom) {
        valideQuery.rateFrom = validInteger(query.rateFrom, 'rateFrom');
        if (valideQuery.rateFrom < 0 || valideQuery.rateFrom > 10)
            throw new NotAcceptableException(
                'Поле rateFrom должно быть не больше 10 и не меньше 0',
            );
    }
    if (query.rateTo) {
        valideQuery.rateTo = validInteger(query.rateTo, 'rateFrom');
        if (valideQuery.rateTo < 0 || valideQuery.rateTo > 10)
            throw new NotAcceptableException('Поле rateTo должно быть не больше 10 и не меньше 0');
    }
    if (valideQuery.rateFrom && valideQuery.rateTo)
        fromNotGreetThenTo(valideQuery.rateFrom, valideQuery.rateTo, 'rate');
}
