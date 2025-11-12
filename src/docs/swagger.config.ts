// src/config/swagger.config.ts
import swaggerJsdoc from 'swagger-jsdoc';
import appConfig from '../config/app.config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway - Documentação',
      version: '1.0.0',
      description: 'API Gateway centralizado para gerenciar comunicação entre microserviços',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${appConfig.port}`,
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api.seudominio.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            statusCode: {
              type: 'integer',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Mensagem de erro'
            }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
            uptime: {
              type: 'number',
              example: 123.456
            },
            service: {
              type: 'string',
              example: 'API Gateway'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'senha123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '123e4567-e89b-12d3-a456-426614174000'
                },
                email: {
                  type: 'string',
                  example: 'usuario@exemplo.com'
                },
                name: {
                  type: 'string',
                  example: 'João Silva'
                }
              }
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            name: {
              type: 'string',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              example: 'senha123'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '123e4567-e89b-12d3-a456-426614174000'
            },
            name: {
              type: 'string',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              example: 'usuario@exemplo.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        SendEmailRequest: {
          type: 'object',
          required: ['to', 'subject', 'body'],
          properties: {
            to: {
              type: 'string',
              format: 'email',
              example: 'destinatario@exemplo.com'
            },
            subject: {
              type: 'string',
              example: 'Assunto do email'
            },
            body: {
              type: 'string',
              example: 'Conteúdo do email em HTML ou texto'
            },
            cc: {
              type: 'array',
              items: {
                type: 'string',
                format: 'email'
              }
            },
            bcc: {
              type: 'array',
              items: {
                type: 'string',
                format: 'email'
              }
            }
          }
        },
        CheckoutRequest: {
          type: 'object',
          required: ['amount', 'items'],
          properties: {
            amount: {
              type: 'number',
              example: 99.90
            },
            currency: {
              type: 'string',
              example: 'BRL',
              default: 'BRL'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: 'prod_123'
                  },
                  name: {
                    type: 'string',
                    example: 'Produto Exemplo'
                  },
                  quantity: {
                    type: 'integer',
                    example: 1
                  },
                  price: {
                    type: 'number',
                    example: 99.90
                  }
                }
              }
            },
            customer: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'João Silva'
                },
                email: {
                  type: 'string',
                  example: 'joao@exemplo.com'
                },
                document: {
                  type: 'string',
                  example: '12345678900'
                }
              }
            }
          }
        },
        Payment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'pay_123456'
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
              example: 'completed'
            },
            amount: {
              type: 'number',
              example: 99.90
            },
            currency: {
              type: 'string',
              example: 'BRL'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      },
      responses: {
        Unauthorized: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                statusCode: 401,
                message: 'Token inválido ou expirado'
              }
            }
          }
        },
        Forbidden: {
          description: 'Acesso negado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        BadRequest: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ServiceUnavailable: {
          description: 'Serviço temporariamente indisponível',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        TooManyRequests: {
          description: 'Limite de requisições excedido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                statusCode: 429,
                message: 'Muitas requisições. Tente novamente mais tarde.'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Health',
        description: 'Verificação de saúde do serviço'
      },
      {
        name: 'Auth',
        description: 'Autenticação e autorização'
      },
      {
        name: 'Users',
        description: 'Gerenciamento de usuários'
      },
      {
        name: 'Email',
        description: 'Serviço de envio de emails'
      },
      {
        name: 'Payment',
        description: 'Processamento de pagamentos'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;