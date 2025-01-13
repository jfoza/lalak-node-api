import { paginationOrderSchema } from '@/common/presentation/http/zod/schemas';
import { z } from 'zod';

export const eventSearchParamsDtoSchema = z.object({
  description: z.string().optional(),
  ...paginationOrderSchema,
});
