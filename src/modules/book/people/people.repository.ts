import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleRepositoryInterface } from './interfaces/peopleRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { PeopleListQuery, PeopleList } from './dto/peopleList.dto';
import { Person } from './dto/person.dto';
import { getPagination } from 'src/shared/dto/pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeopleRepository implements PeopleRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getPeopleList(query: PeopleListQuery): Promise<PeopleList> {
        const { search, limit, page, role } = query;
        const whereInput: Prisma.PeopleWhereInput = {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { otherNames: { contains: search, mode: 'insensitive' } },
            ],
            ...(role ? { role: { has: role } } : {}),
        };
        const people = await this.prisma.people.findMany({
            where: whereInput,
            orderBy: { name: 'asc' },
            take: limit,
            skip: limit * (page - 1),
            select: {
                id: true,
                name: true,
                avatar: true,
            },
        });
        const count = await this.prisma.people.count({ where: whereInput });

        return {
            data: people,
            ...getPagination(count, page, limit),
        };
    }

    async getPerson(name: string, lang: Lang): Promise<Person> {
        const person = await this.prisma.people.findUnique({
            where: { name },
            select: {
                id: true,
                name: true,
                avatar: true,
                otherNames: true,
                description: {
                    select: {
                        ru: true,
                        en: lang === 'en',
                    },
                },
            },
        });
        if (!person) throw new NotFoundException(`${name} не найден`);
        return {
            ...person,
            otherNames: person.otherNames ? person.otherNames.split('\n') : [],
            description: person.description?.[lang] || person.description?.ru || '',
        };
    }
}
