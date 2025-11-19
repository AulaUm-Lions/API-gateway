// src/types/index.ts
import { Request } from 'express';

export interface ServiceConfig {
  url: string;
  timeout: number;
  retries: number;
}

export interface ServicesConfig {
  auth: ServiceConfig;
  users: ServiceConfig;
  email: ServiceConfig;
  payment: ServiceConfig;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export interface RateLimitsConfig {
  default: RateLimitConfig;
  auth: RateLimitConfig;
  payment: RateLimitConfig;
}

export interface AppConfig {
  port: number;
  env: string;
  cors: {
    origin: string;
    methods: string[];
    credentials: boolean;
  };
  logging: {
    level: string;
    format: string;
  };
  circuitBreaker: {
    timeout: number;
    errorThresholdPercentage: number;
    resetTimeout: number;
  };
}

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  [key: string]: any;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
  token?: string;
}

export interface ProxyResponse {
  status: number;
  data: any;
  headers: any;
}

export interface ApiErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  stack?: string;
}