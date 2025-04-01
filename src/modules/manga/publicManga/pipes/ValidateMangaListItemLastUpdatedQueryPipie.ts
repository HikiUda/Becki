import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { MangaListItemLastUpdatedQuery } from '../dto/mangaListItem/mangaListItemLastUpdated.dto';

@Injectable()
export class ValidateMangaListItemLastUpdatedQueryPipe implements PipeTransform<any> {
    transform(query: any, metadata: ArgumentMetadata) {
        const validQuery: MangaListItemLastUpdatedQuery = {
            scope: query.scope ? query.scope : 'all',
            lang: query.lang ? query.lang : 'ru',
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        return validQuery;
    }
}
