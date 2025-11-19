// src/services/proxy.service.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import ApiError from '../errors/api.error';
import { ServiceConfig, ProxyResponse, AuthRequest } from '../interfaces';

class ProxyService {
  private config: ServiceConfig;
  private retryCount: number = 0;

  constructor(serviceConfig: ServiceConfig) {
    this.config = serviceConfig;
  }

  async forwardRequest(req: AuthRequest, path: string = ''): Promise<ProxyResponse> {
    const url = `${this.config.url}${path || req.path}`;
    
    try {
      const response = await this.makeRequest({
        method: req.method,
        url,
        data: req.body,
        headers: this.prepareHeaders(req.headers as Record<string, string>),
        params: req.query,
        timeout: this.config.timeout
      });

      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return this.handleError(error as AxiosError, req, path);
    }
  }

  private async makeRequest(config: AxiosRequestConfig): Promise<any> {
    try {
      return await axios(config);
    } catch (error) {
      // Retry logic
      if (this.shouldRetry(error as AxiosError) && this.retryCount < this.config.retries) {
        this.retryCount++;
        await this.delay(1000 * this.retryCount);
        return this.makeRequest(config);
      }
      throw error;
    } finally {
      this.retryCount = 0;
    }
  }

  private prepareHeaders(originalHeaders: Record<string, string>): Record<string, string> {
    const headers = { ...originalHeaders };
    
    // Remove headers que não devem ser enviados
    delete headers.host;
    delete headers['content-length'];
    delete headers.connection;
    
    return headers;
  }

  private shouldRetry(error: AxiosError): boolean {
    // Retry apenas em erros de rede ou 5xx
    return (
      !error.response || 
      (error.response.status >= 500 && error.response.status <= 599)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleError(error: AxiosError, req: AuthRequest, path: string): ProxyResponse {
    const url = `${this.config.url}${path || req.path}`;
    
    console.error(`Erro ao chamar ${url}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      // O serviço respondeu com um erro
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      };
    }

    if (error.code === 'ECONNREFUSED') {
      throw ApiError.serviceUnavailable(
        `Serviço indisponível: não foi possível conectar`
      );
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      throw ApiError.serviceUnavailable(
        `Serviço demorou muito para responder`
      );
    }

    throw ApiError.internal('Erro ao processar requisição');
  }
}

export default ProxyService;