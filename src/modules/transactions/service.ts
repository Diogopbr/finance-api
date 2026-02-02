import { NotFoundError, ValidationError } from '../../shared/errors/AppError';
import { TransactionRepository } from './repository';
import { CreateTransactionDTO, UpdateTransactionDTO, Transaction, TransactionFilters, TransactionSummary } from './transaction.interface';

export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
    // Validação de negócio
    if (data.amount <= 0) {
      throw new ValidationError('Amount must be greater than zero');
    }

    return await this.repository.create(data);
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }

  async listTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
    return await this.repository.findAll(filters);
  }

  async updateTransaction(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    if (data.amount !== undefined && data.amount <= 0) {
      throw new ValidationError('Amount must be greater than zero');
    }

    return await this.repository.update(id, data);
  }

  async deleteTransaction(id: string): Promise<void> {
    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    await this.repository.delete(id);
  }

  async getTransactionSummary(filters?: TransactionFilters): Promise<TransactionSummary> {
    return await this.repository.getSummary(filters);
  }
}
