import { Injectable, NotFoundException } from '@nestjs/common';
import { EditPeopleRepositoryInterface } from './interfaces/editPeopleRepository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PersonId } from '../_common/model/people';
import { CreatePersonDto } from './dto/createPerson.dto';
import { EditedPerson } from './dto/editedPerson.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';

@Injectable()
export class EditPeopleRepository implements EditPeopleRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getEditedPerson(personId: PersonId): Promise<EditedPerson> {
        const person = await this.prisma.people.findUnique({
            where: { id: personId },
            select: {
                id: true,
                name: true,
                otherNames: true,
                description: { select: { ru: true, en: true } },
                avatar: true,
                role: true,
            },
        });
        if (!person) throw new NotFoundException(`Человек с id-${personId} не найден`);
        return {
            ...person,
            otherNames: person.otherNames ? person.otherNames.split('\n') : [],
            description: {
                ru: person?.description?.ru || '',
                en: person?.description?.en || null,
            },
        };
    }

    async createPerson(data: CreatePersonDto): Promise<{ personId: PersonId; isExist: boolean }> {
        const isExist = await this.prisma.people.findUnique({
            where: { name: data.name },
            select: { role: true },
        });
        const role = isExist
            ? isExist.role.includes(data.role)
                ? isExist.role
                : [...isExist.role, data.role]
            : [data.role];

        const { id } = await this.prisma.people.upsert({
            where: { name: data.name },
            create: {
                name: data.name,
                otherNames: data.otherNames && data.otherNames.join('\n'),
                role,
                description: { create: data.decription },
            },
            update: {
                role: { set: role },
            },
            select: { id: true },
        });
        return { personId: id as PersonId, isExist: !!isExist };
    }

    async updatePerson(personId: PersonId, data: UpdatePersonDto, avatar?: string): Promise<void> {
        await this.prisma.people.update({
            where: { id: personId },
            data: {
                name: data.name,
                otherNames: data.otherNames && data.otherNames.join('\n'),
                avatar,
                role: data.role,
                description: {
                    update: {
                        ru: data.description?.ru,
                        en: data.description?.en,
                    },
                },
            },
        });
    }

    async getAvatar(personId: PersonId): Promise<string | null> {
        const person = await this.prisma.people.findUnique({
            where: { id: personId },
            select: { avatar: true },
        });
        return person && person.avatar;
    }
}
