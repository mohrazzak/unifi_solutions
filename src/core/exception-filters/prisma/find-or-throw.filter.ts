import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { filter } from 'nestjs-conditional-exception-filter';

@Catch(
  filter({
    for: PrismaClientKnownRequestError,
    when: (error) => error.code === 'P2025',
  }),
)
export class PrismaFindOrThrowFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    try {
      const regex = /No (\w+) found/;
      const match = exception.message.match(regex);
      const entity = match ? match[1] : 'Entity';
      const errorMessage = `Not found ${entity}`;

      res.status(HttpStatus.NOT_FOUND).json({
        status: false,
        statusCode: HttpStatus.NOT_FOUND,
        message: errorMessage,
        path: req.path,
        time: new Date().toISOString(),
        data: null,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        path: req.path,
        time: new Date().toISOString(),
        data: null,
      });
    }
  }
}
