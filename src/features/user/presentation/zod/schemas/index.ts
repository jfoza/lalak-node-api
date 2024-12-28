import { paginationOrderSchema } from '@/common/presentation/zod/schemas';
import { z } from 'zod';

export const adminUserSearchParamsDtoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ...paginationOrderSchema,
});
