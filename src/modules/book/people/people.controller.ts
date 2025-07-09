import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleControllerInterface } from './interfaces/peopleController';
import { PeopleService } from './people.service';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { PeopleListQuery, PeopleList } from './dto/peopleList.dto';
import { Person } from './dto/person.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';

@Controller('people')
export class PeopleController implements PeopleControllerInterface {
    constructor(private service: PeopleService) {}

    @Get()
    @ApiOkResponse({ type: PeopleList })
    async getPeopleList(@Query() query: PeopleListQuery): Promise<PeopleList> {
        return await this.service.getPeopleList(query);
    }

    @Get(':name')
    @ApiParam({ name: 'name', type: 'string', description: 'Имя человека' })
    @ApiOkResponse({ type: Person })
    @ApiCustomNotFoundResponse()
    async getPerson(@Param('name') name: string, @Query() query: LangQuery): Promise<Person> {
        return await this.service.getPerson(name, query.lang);
    }
}
