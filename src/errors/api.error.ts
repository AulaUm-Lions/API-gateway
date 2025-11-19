// src/errors/ApiError.ts
class ApiError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
  
    constructor(statusCode: number, message: string, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    static badRequest(message: string = 'Requisição inválida'): ApiError {
      return new ApiError(400, message);
    }
  
    static unauthorized(message: string = 'Não autorizado'): ApiError {
      return new ApiError(401, message);
    }
  
    static forbidden(message: string = 'Acesso negado'): ApiError {
      return new ApiError(403, message);
    }
  
    static notFound(message: string = 'Recurso não encontrado'): ApiError {
      return new ApiError(404, message);
    }
  
    static serviceUnavailable(message: string = 'Serviço temporariamente indisponível'): ApiError {
      return new ApiError(503, message);
    }
  
    static internal(message: string = 'Erro interno do servidor'): ApiError {
      return new ApiError(500, message);
    }
  }
  
  export default ApiError;