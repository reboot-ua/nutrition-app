declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';
  const swaggerUi: {
    serve: RequestHandler[];
    setup: (specs: any) => RequestHandler;
  };
  export default swaggerUi;
}

declare module 'swagger-jsdoc' {
  const swaggerJsdoc: (options: any) => any;
  export default swaggerJsdoc;
} 