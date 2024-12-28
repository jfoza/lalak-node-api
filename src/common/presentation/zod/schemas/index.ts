import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Invalid email format.'),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[\W_]/, 'Password must contain at least one symbol'),

    passwordConfirmation: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

export const uuidSchema = z.string().uuid('Invalid UUID format.');

export const orderSchema = {
  columnName: z.string().optional(),
  columnOrder: z.string().optional(),
};

export const paginationOrderSchema = {
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1, {
      message: 'The page param must be at least 1',
    }),

  perPage: z
    .string()
    .min(1, { message: 'The perPage param is required' })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1, {
      message: 'The perPage param must be at least 1',
    }),

  ...orderSchema,
};

export const optionalPaginationOrderSchema = {
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || val >= 1, {
      message: 'page must be at least 1',
    }),

  perPage: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || val >= 1, {
      message: 'perPage must be at least 1',
    }),

  ...orderSchema,
};
