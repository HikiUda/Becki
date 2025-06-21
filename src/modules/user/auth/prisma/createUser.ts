import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { CreateUserDto } from '../dto/createUser.dto';

export const createUser = async (dto: CreateUserDto) => {
    return await prisma.user.create({
        data: { ...dto, name: dto.login },
        select: { id: true, name: true, login: true, password: true },
    });
};
export type CreateUserReturnType = Prisma.PromiseReturnType<typeof createUser>;
