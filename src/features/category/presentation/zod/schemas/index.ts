import { paginationOrderSchema } from '@/common/presentation/http/zod/schemas';
import { z } from 'zod';

export const categorySearchParamsDtoSchema = z.object({
  themeUuid: z.string().uuid().optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
  ...paginationOrderSchema,
});
