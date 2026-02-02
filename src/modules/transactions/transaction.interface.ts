export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionDTO {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date?: Date;
}

export interface UpdateTransactionDTO {
  description?: string;
  amount?: number;
  type?: 'income' | 'expense';
  category?: string;
  date?: Date;
}

export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
