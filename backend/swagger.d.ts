import { RequestHandler } from 'express';

export const swaggerUi: {
  serve: RequestHandler[];
  setup: (specs: any) => RequestHandler;
};

export const specs: any; 