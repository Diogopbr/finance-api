import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    description: z.string().min(3, 'Description must have at least 3 characters'),
    amount: z.number().positive('Amount must be positive'),
    type: z.enum(['income', 'expense'], {
      errorMap: () => ({ message: 'Type must be income or expense' }),
    }),
    category: z.string().min(2, 'Category must have at least 2 characters'),
    date: z.string().datetime().optional(),
  }),
});

export const updateTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid transaction ID'),
  }),
  body: z.object({
    description: z.string().min(3).optional(),
    amount: z.number().positive().optional(),
    type: z.enum(['income', 'expense']).optional(),
    category: z.string().min(2).optional(),
    date: z.string().datetime().optional(),
  }),
});

export const getTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid transaction ID'),
  }),
});

export const deleteTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid transaction ID'),
  }),
});

export const listTransactionsSchema = z.object({
  query: z.object({
    type: z.enum(['income', 'expense']).optional(),
    category: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});
