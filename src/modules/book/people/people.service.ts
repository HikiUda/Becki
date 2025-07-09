import { Injectable } from '@nestjs/common';
import { PeopleServiceInterface } from './interfaces/peopleService';
import { PeopleRepository } from './people.repository';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { PeopleListQuery, PeopleList } from './dto/peopleList.dto';
import { Person } from './dto/person.dto';

@Injectable()
export class PeopleService implements PeopleServiceInterface {
    constructor(private repository: PeopleRepository) {}

    async getPeopleList(query: PeopleListQuery): Promise<PeopleList> {
        return await this.repository.getPeopleList(query);
    }

    async getPerson(name: string, lang: Lang): Promise<Person> {
        return await this.repository.getPerson(name, lang);
    }
}
