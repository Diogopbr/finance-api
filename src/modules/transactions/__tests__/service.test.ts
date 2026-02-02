import { TransactionService } from '../service';
import { TransactionRepository } from '../repository';
import { NotFoundError, ValidationError } from '../../../shared/errors/AppError';
import { CreateTransactionDTO, UpdateTransactionDTO } from '../transaction.interface';

// Mock do repository
jest.mock('../repository');

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    repository = new TransactionRepository() as jest.Mocked<TransactionRepository>;
    service = new TransactionService(repository);
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a transaction successfully', async () => {
      const input: CreateTransactionDTO = {
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Work',
      };

      const expectedOutput = {
        id: '123',
        ...input,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.create.mockResolvedValue(expectedOutput);

      const result = await service.createTransaction(input);

      expect(result).toEqual(expectedOutput);
      expect(repository.create).toHaveBeenCalledWith(input);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ValidationError if amount is zero or negative', async () => {
      const input: CreateTransactionDTO = {
        description: 'Invalid',
        amount: 0,
        type: 'income',
        category: 'Test',
      };

      await expect(service.createTransaction(input)).rejects.toThrow(ValidationError);
      await expect(service.createTransaction(input)).rejects.toThrow('Amount must be greater than zero');
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('getTransactionById', () => {
    it('should return a transaction when it exists', async () => {
      const transaction = {
        id: '123',
        description: 'Salary',
        amount: 5000,
        type: 'income' as const,
        category: 'Work',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findById.mockResolvedValue(transaction);

      const result = await service.getTransactionById('123');

      expect(result).toEqual(transaction);
      expect(repository.findById).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundError when transaction does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.getTransactionById('999')).rejects.toThrow(NotFoundError);
      await expect(service.getTransactionById('999')).rejects.toThrow('Transaction not found');
    });
  });

  describe('updateTransaction', () => {
    it('should update a transaction successfully', async () => {
      const existingTransaction = {
        id: '123',
        description: 'Old Description',
        amount: 100,
        type: 'expense' as const,
        category: 'Food',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateData: UpdateTransactionDTO = {
        description: 'New Description',
        amount: 150,
      };

      const updatedTransaction = {
        ...existingTransaction,
        ...updateData,
      };

      repository.findById.mockResolvedValue(existingTransaction);
      repository.update.mockResolvedValue(updatedTransaction);

      const result = await service.updateTransaction('123', updateData);

      expect(result).toEqual(updatedTransaction);
      expect(repository.findById).toHaveBeenCalledWith('123');
      expect(repository.update).toHaveBeenCalledWith('123', updateData);
    });

    it('should throw NotFoundError when transaction does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.updateTransaction('999', { amount: 100 })).rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError when amount is zero or negative', async () => {
      const existingTransaction = {
        id: '123',
        description: 'Test',
        amount: 100,
        type: 'expense' as const,
        category: 'Food',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findById.mockResolvedValue(existingTransaction);

      await expect(service.updateTransaction('123', { amount: 0 })).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction successfully', async () => {
      const transaction = {
        id: '123',
        description: 'Test',
        amount: 100,
        type: 'expense' as const,
        category: 'Food',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findById.mockResolvedValue(transaction);
      repository.delete.mockResolvedValue(undefined);

      await service.deleteTransaction('123');

      expect(repository.findById).toHaveBeenCalledWith('123');
      expect(repository.delete).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundError when transaction does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.deleteTransaction('999')).rejects.toThrow(NotFoundError);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe('listTransactions', () => {
    it('should return all transactions without filters', async () => {
      const transactions = [
        {
          id: '1',
          description: 'Salary',
          amount: 5000,
          type: 'income' as const,
          category: 'Work',
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          description: 'Lunch',
          amount: 50,
          type: 'expense' as const,
          category: 'Food',
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      repository.findAll.mockResolvedValue(transactions);

      const result = await service.listTransactions();

      expect(result).toEqual(transactions);
      expect(repository.findAll).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getTransactionSummary', () => {
    it('should return transaction summary', async () => {
      const summary = {
        totalIncome: 10000,
        totalExpense: 3000,
        balance: 7000,
      };

      repository.getSummary.mockResolvedValue(summary);

      const result = await service.getTransactionSummary();

      expect(result).toEqual(summary);
      expect(repository.getSummary).toHaveBeenCalledWith(undefined);
    });
  });
});
