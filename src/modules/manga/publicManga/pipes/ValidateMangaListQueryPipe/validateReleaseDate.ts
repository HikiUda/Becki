import { isValidDate } from 'src/common/helpers/isValidDate';
import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';
import { NotAcceptableException } from '@nestjs/common';

export function validateReleaseDate(valideQuery: MangaListQuery, query: MangaListGetQuery) {
    if (query.releaseDateFrom) {
        const date = new Date(query.releaseDateFrom);
        if (!isValidDate(date))
            throw new NotAcceptableException('Неправильный формат даты (releaseDateFrom)');
        valideQuery.releaseDateFrom = date;
    }
    if (query.releaseDateTo) {
        const date = new Date(query.releaseDateTo);
        if (!isValidDate(date))
            throw new NotAcceptableException('Неправильный формат даты (releaseDateTo)');
        valideQuery.releaseDateTo = date;
    }
}
