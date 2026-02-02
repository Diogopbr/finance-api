import { IRepository } from '../../shared/interfaces/base.interface';
import { Transaction, CreateTransactionDTO, UpdateTransactionDTO, TransactionFilters } from './transaction.interface';
import { prisma } from '../../shared/database/prisma';

// Dependency Inversion Principle (DIP)
// Repository depende de abstração (IRepository)
export class TransactionRepository implements IRepository<Transaction> {
  async findAll(filters?: TransactionFilters): Promise<Transaction[]> {
    const where: any = {};

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.date.lte = filters.endDate;
      }
    }

    return await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    }) as Transaction[];
  }

  async findById(id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({
      where: { id },
    }) as Transaction | null;
  }

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    return await prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date || new Date(),
      },
    }) as Transaction;
  }

  async update(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
    return await prisma.transaction.update({
      where: { id },
      data,
    }) as Transaction;
  }

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({
      where: { id },
    });
  }

  async getSummary(filters?: TransactionFilters): Promise<{ totalIncome: number; totalExpense: number; balance: number }> {
    const transactions = await this.findAll(filters);

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, balance: 0 }
    );

    summary.balance = summary.totalIncome - summary.totalExpense;
    return summary;
  }
}
