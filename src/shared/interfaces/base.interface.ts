// Interface Segregation Principle (ISP)
// Interfaces pequenas e específicas

export interface IController {
  handle(request: any, response: any): Promise<any>;
}

export interface IService<T> {
  execute(data: any): Promise<T>;
}

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<void>;
}
