import { Request, Response, NextFunction } from 'express';
import { TransactionService } from './service';
import { IController } from '../../shared/interfaces/base.interface';
import { CreateTransactionDTO, UpdateTransactionDTO, TransactionFilters } from './transaction.interface';

// Single Responsibility Principle (SRP)
// Controller apenas lida com requisições HTTP
export class TransactionController implements IController {
  constructor(private readonly service: TransactionService) {}

  createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateTransactionDTO = req.body;
      
      if (data.date) {
        data.date = new Date(data.date);
      }

      const transaction = await this.service.createTransaction(data);

      res.status(201).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  getTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const transaction = await this.service.getTransactionById(id);

      res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  listTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters: TransactionFilters = {};

      if (req.query.type) {
        filters.type = req.query.type as 'income' | 'expense';
      }

      if (req.query.category) {
        filters.category = req.query.category as string;
      }

      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate as string);
      }

      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate as string);
      }

      const transactions = await this.service.listTransactions(filters);

      res.status(200).json({
        status: 'success',
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data: UpdateTransactionDTO = req.body;

      if (data.date) {
        data.date = new Date(data.date);
      }

      const transaction = await this.service.updateTransaction(id, data);

      res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.service.deleteTransaction(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getTransactionSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters: TransactionFilters = {};

      if (req.query.type) {
        filters.type = req.query.type as 'income' | 'expense';
      }

      if (req.query.category) {
        filters.category = req.query.category as string;
      }

      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate as string);
      }

      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate as string);
      }

      const summary = await this.service.getTransactionSummary(filters);

      res.status(200).json({
        status: 'success',
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  };

  async handle(request: any, response: any): Promise<any> {
    return this.createTransaction(request, response, () => {});
  }
}
