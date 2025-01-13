import { paginationOrderSchema } from '@/common/presentation/http/zod/schemas';
import { z } from 'zod';

export const adminUserSearchParamsDtoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ...paginationOrderSchema,
});

export const customerSearchParamsDtoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ...paginationOrderSchema,
});
