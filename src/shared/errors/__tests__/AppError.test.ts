import { AppError, NotFoundError, ValidationError, InternalServerError } from '../AppError';

describe('AppError', () => {
  describe('NotFoundError', () => {
    it('should create a NotFoundError with default message', () => {
      const error = new NotFoundError();

      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Resource not found');
      expect(error.statusCode).toBe(404);
      expect(error.name).toBe('NotFoundError');
    });

    it('should create a NotFoundError with custom message', () => {
      const error = new NotFoundError('Custom not found message');

      expect(error.message).toBe('Custom not found message');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('ValidationError', () => {
    it('should create a ValidationError with default message', () => {
      const error = new ValidationError();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('ValidationError');
    });

    it('should create a ValidationError with custom message', () => {
      const error = new ValidationError('Invalid input');

      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('InternalServerError', () => {
    it('should create an InternalServerError with default message', () => {
      const error = new InternalServerError();

      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Internal server error');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('InternalServerError');
    });

    it('should create an InternalServerError with custom message', () => {
      const error = new InternalServerError('Database connection failed');

      expect(error.message).toBe('Database connection failed');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('AppError base class', () => {
    it('should capture stack trace', () => {
      const error = new NotFoundError();

      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });
  });
});
