import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const OrderTypeEnum = z.enum(['asc', 'desc']);
export type OrderType = z.infer<typeof OrderTypeEnum>;

export const OrderQueryScheme = z.object({
    order: OrderTypeEnum.default('desc'),
});
export class OrderTypeDto extends createZodDto(OrderQueryScheme) {}
