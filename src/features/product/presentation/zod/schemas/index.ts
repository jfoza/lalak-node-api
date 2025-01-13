import { paginationOrderSchema } from '@/common/presentation/http/zod/schemas';
import { z } from 'zod';

export const productSearchParamsDtoSchema = z.object({
  description: z.string().optional(),
  userUuid: z.string().uuid().optional(),
  categories: z.array(z.string().uuid()).optional(),
  events: z.array(z.string().uuid()).optional(),
  active: z.boolean().optional(),
  ...paginationOrderSchema,
});
