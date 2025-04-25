import { prisma } from 'src/common/helpers/prisma';
import { getActionUserChapterId } from '../helpers/getActionUserChapterId';

export const setUserLikeChapter = async (chapterId: number, userId: number) => {
    const id = getActionUserChapterId(chapterId, userId);
    const isAlreadyLiked = await prisma.userLikeChapter.findUnique({ where: { id } });
    if (!isAlreadyLiked) {
        await prisma.userLikeChapter.create({ data: { id, chapterId, userId } });
    } else {
        await prisma.userLikeChapter.update({
            where: { id },
            data: { isLiked: !isAlreadyLiked.isLiked },
        });
    }
};
