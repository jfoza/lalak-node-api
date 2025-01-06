import { paginationOrderSchema } from '@/common/presentation/zod/schemas';
import { z } from 'zod';

export const themeSearchParamsDtoSchema = z.object({
  description: z.string().optional(),
  ...paginationOrderSchema,
});
