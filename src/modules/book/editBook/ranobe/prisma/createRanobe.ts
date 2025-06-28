import { PrismaClient } from '@prisma/client';
import { createBookInput } from '../../__common/prisma/getCreateBookInput';
import { MutateRanobeDto } from '../dto/mutateRanobe.dto';

export const createRanobe = async (prisma: PrismaClient, dto: MutateRanobeDto) => {
    const ranobe = await prisma.ranobe.create({ data: createBookInput(dto) });
    return ranobe.id;
};
