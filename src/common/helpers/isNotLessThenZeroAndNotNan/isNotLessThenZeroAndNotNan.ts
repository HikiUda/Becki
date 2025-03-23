export function isNotLessThenZeroAndNotNan(num: number): boolean {
    if (num < 0) return false;
    if (isNaN(num)) return false;
    return true;
}
