import { Router } from 'express';
import { TransactionController } from './controller';
import { TransactionService } from './service';
import { TransactionRepository } from './repository';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionSchema,
  deleteTransactionSchema,
  listTransactionsSchema,
} from './transaction.schema';

// Dependency Injection (DI) - Injeção de dependências
const repository = new TransactionRepository();
const service = new TransactionService(repository);
const controller = new TransactionController(service);

const router = Router();

// Rotas com validação
router.post(
  '/',
  validateRequest(createTransactionSchema),
  controller.createTransaction
);

router.get(
  '/',
  validateRequest(listTransactionsSchema),
  controller.listTransactions
);

router.get(
  '/summary',
  validateRequest(listTransactionsSchema),
  controller.getTransactionSummary
);

router.get(
  '/:id',
  validateRequest(getTransactionSchema),
  controller.getTransaction
);

router.put(
  '/:id',
  validateRequest(updateTransactionSchema),
  controller.updateTransaction
);

router.delete(
  '/:id',
  validateRequest(deleteTransactionSchema),
  controller.deleteTransaction
);

export { router as transactionRoutes };
