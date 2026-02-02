import request from 'supertest';
import { app } from '../../../server';

describe('TransactionController - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/transactions', () => {
    it('should create a transaction and return 201', async () => {
      const newTransaction = {
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Work',
      };

      const response = await request(app)
        .post('/api/transactions')
        .send(newTransaction)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('id');
    });

    it('should return 400 for invalid data', async () => {
      const invalidTransaction = {
        description: 'ab', // Muito curto
        amount: -100, // Negativo
        type: 'invalid', // Tipo inválido
        category: 'X',
      };

      const response = await request(app)
        .post('/api/transactions')
        .send(invalidTransaction)
        .expect(400);

      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/transactions/:id', () => {
    it('should return 404 when transaction does not exist', async () => {
      const response = await request(app)
        .get('/api/transactions/00000000-0000-0000-0000-000000000000')
        .expect(404);

      expect(response.body.status).toBe('error');
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app)
        .get('/api/transactions/invalid-id')
        .expect(400);

      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/transactions', () => {
    it('should return list of transactions', async () => {
      const response = await request(app)
        .get('/api/transactions')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should filter by type', async () => {
      const response = await request(app)
        .get('/api/transactions?type=income')
        .expect(200);

      expect(response.body.status).toBe('success');
    });
  });

  describe('GET /api/transactions/summary', () => {
    it('should return transaction summary', async () => {
      const response = await request(app)
        .get('/api/transactions/summary')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('totalIncome');
      expect(response.body.data).toHaveProperty('totalExpense');
      expect(response.body.data).toHaveProperty('balance');
    });
  });
});
