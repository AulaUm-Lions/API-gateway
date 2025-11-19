// src/server.ts
import 'dotenv/config';
import app from './app';
import appConfig from './config/app.config';
import servicesConfig from './config/services.config';
import { Server } from 'http';

const server: Server = app.listen(appConfig.port, () => {
  console.log('========================================');
  console.log(`🚀 API Gateway rodando em http://localhost:${appConfig.port}`);
  console.log(`📦 Ambiente: ${appConfig.env}`);
  console.log('========================================');
  console.log('Serviços configurados:');
  Object.entries(servicesConfig.services).forEach(([name, config]) => {
    console.log(`  • ${name.padEnd(10)} → ${config.url}`);
  });
  console.log('========================================');
  console.log(`📚 Documentação: http://localhost:${appConfig.port}/api-docs`);
  console.log('========================================');
});

// Tratamento de encerramento gracioso
const gracefulShutdown = (signal: string): void => {
  console.log(`\n⚠️  ${signal} recebido. Encerrando servidor...`);
  
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });

  // Forçar encerramento após 10 segundos
  setTimeout(() => {
    console.error('⚠️  Forçando encerramento após timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

export default server;