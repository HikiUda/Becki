import { z } from 'zod';

export const AgeRatingEnum = z.union([
    z.literal(0),
    z.literal(6),
    z.literal(12),
    z.literal(16),
    z.literal(18),
]);
