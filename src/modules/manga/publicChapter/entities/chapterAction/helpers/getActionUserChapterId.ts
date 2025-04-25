export function getActionUserChapterId(actionId: number, userId: number) {
    return `${actionId}-${userId}`;
}
