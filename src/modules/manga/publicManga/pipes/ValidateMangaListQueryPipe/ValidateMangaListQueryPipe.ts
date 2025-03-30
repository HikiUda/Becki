import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    NotAcceptableException,
} from '@nestjs/common';
import { MangaListGetQuery, MangaListQuery } from '../../dto/mangaListItem.dto';
import { MangaStatus, MangaType } from '@prisma/client';
import { noneNaNInArray, stringIdsToIntArray } from './validationFunction';
import { validateChapterCount } from './validateChapterCount';
import { validateAgeRate } from './validateAgeRate';
import { validateRateCount } from './validateRateCount';
import { validateRate } from './validateRate';
import { validateReleaseDate } from './validateReleaseDate';

@Injectable()
export class ValidateMangaListQueryPipe implements PipeTransform<MangaListGetQuery> {
    transform(query: MangaListGetQuery, metadata: ArgumentMetadata) {
        const valideQuery: MangaListQuery = {
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            order: query.order === 'asc' || query.order === 'desc' ? query.order : 'asc',
            sortBy: query.sortBy || 'popularity',
            janres: stringIdsToIntArray(query.janres),
            tags: stringIdsToIntArray(query.tags),
            notJanres: stringIdsToIntArray(query.notJanres),
            notTags: stringIdsToIntArray(query.notTags),
        };

        // Janres and Tags
        noneNaNInArray(valideQuery.janres);
        noneNaNInArray(valideQuery.tags);
        noneNaNInArray(valideQuery.notJanres);
        noneNaNInArray(valideQuery.notTags);

        // Search, type, status
        if (query.search) valideQuery.search = query.search;
        if (query.status) {
            if (!MangaStatus[query.status])
                throw new NotAcceptableException('Такого статуса тайтла не существует. (status)');
            valideQuery.status = query.status;
        }
        if (query.type) {
            if (!MangaType[query.type])
                throw new NotAcceptableException('Такого типа тайтла не существует. (type)');
            valideQuery.type = query.type;
        }

        validateChapterCount(valideQuery, query);
        validateAgeRate(valideQuery, query);
        validateRateCount(valideQuery, query);
        validateRate(valideQuery, query);
        validateReleaseDate(valideQuery, query);

        //TODO bookmarks?: Bookmarks[];

        return valideQuery;
    }
}
