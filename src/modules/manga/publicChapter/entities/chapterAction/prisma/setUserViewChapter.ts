import { prisma } from 'src/common/helpers/prisma';
import { getActionUserChapterId } from '../helpers/getActionUserChapterId';

export const setUserViewChapter = async (chapterId: number, userId: number) => {
    const id = getActionUserChapterId(chapterId, userId);
    const isAlreadyLiked = await prisma.userViewChapter.findUnique({ where: { id } });
    if (!isAlreadyLiked) {
        await prisma.userViewChapter.create({ data: { id, chapterId, userId } });
    } else {
        await prisma.userViewChapter.update({
            where: { id },
            data: { isViewed: !isAlreadyLiked.isViewed },
        });
    }
};
