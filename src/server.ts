/**
 * Finance API - Server Entry Point
 * 
 * API RESTful profissional para gestão financeira
 * Implementa Clean Architecture e princípios SOLID
 * 
 * @author Seu Nome
 * @version 1.0.0
 * @license MIT
 */

import express, { Application } from 'express';
import { transactionRoutes } from './modules/transactions/routes';
import { errorHandler } from './shared/middlewares/errorHandler';

const app: Application = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Finance API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/transactions', transactionRoutes);

// Error handler - deve ser o último middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export { app };
