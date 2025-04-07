import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { CreateUserDto } from '../dto/createUser.dto';

export const createUser = async (dto: CreateUserDto) => {
    return await prisma.user.create({
        data: { ...dto, name: dto.login, jsonSettings: {} },
        select: { id: true, name: true, login: true, password: true },
    });
};
export type CreateUserReturnType = Prisma.PromiseReturnType<typeof createUser>;
