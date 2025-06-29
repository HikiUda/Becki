import { PrismaClient } from '@prisma/client';
import { MutateRanobeDto } from '../dto/mutateRanobe.dto';
import { getUpdateBookInput } from '../../__common/prisma/getUpdateBookInput';

export const updateRanobe = async (
    prisma: PrismaClient,
    dto: MutateRanobeDto,
    ranobeId: number,
) => {
    const ranobe = await prisma.ranobe.update({
        where: { id: ranobeId },
        data: getUpdateBookInput(dto),
    });
    return ranobe.id;
};
