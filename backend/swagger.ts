import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nutrition App API',
      version: '1.0.0',
      description: 'API для додатку з відстеження харчування та фізичної активності',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальний сервер',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Шлях до файлів з роутами
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs }; 