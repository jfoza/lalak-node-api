import { paginationOrderSchema } from '@/common/presentation/zod/schemas';
import { z } from 'zod';

export const eventSearchParamsDtoSchema = z.object({
  description: z.string().optional(),
  ...paginationOrderSchema,
});
