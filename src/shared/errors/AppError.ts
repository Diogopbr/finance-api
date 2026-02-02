/**
 * Custom Application Errors
 * 
 * Implementa hierarquia de erros customizados seguindo o princípio SRP (Single Responsibility).
 * Cada classe de erro tem uma responsabilidade específica e facilita o tratamento de exceções.
 * 
 * @module shared/errors
 */

/**
 * Base Error Class
 * 
 * Classe abstrata base para todos os erros da aplicação.
 * Implementa o princípio SRP - responsável apenas por estruturar erros com status HTTP.
 * 
 * @abstract
 * @extends Error
 */
export abstract class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found Error (404)
 * 
 * Usado quando um recurso solicitado não é encontrado.
 * Exemplo: Transação com ID inexistente
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Validation Error (400)
 * 
 * Usado quando os dados fornecidos não passam na validação.
 * Exemplo: Valor negativo para amount
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

/**
 * Internal Server Error (500)
 * 
 * Usado para erros inesperados do servidor.
 * Exemplo: Falha na conexão com banco de dados
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
  }
}
