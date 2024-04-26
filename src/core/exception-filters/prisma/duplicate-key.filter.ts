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
    when: (error) => error.code === 'P2002',
  }),
)
export class PrismaDuplicateKeyConstraintFilter implements ExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError & { meta: { target: string } },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    try {
      const keys = exception.meta.target.split('_');
      const resource = keys[0];
      const field = keys[1];

      const errorMessage = `Duplicated Entry, Already existed ${resource} for ${field}`;

      res.status(HttpStatus.CONFLICT).json({
        status: false,
        statusCode: HttpStatus.CONFLICT,
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
