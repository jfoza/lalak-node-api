import { paginationOrderSchema } from '@/common/presentation/zod/schemas';
import { z } from 'zod';

export const customerSearchParamsDtoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ...paginationOrderSchema,
});
