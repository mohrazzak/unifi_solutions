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
    when: (error) => error.code === 'P2003',
  }),
)
export class PrismaForeignKeyFailedFilter implements ExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError & { meta: { field_name: string } },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    try {
      const keys = exception.meta.field_name.split('Id');
      const entity = keys[0];
      const errorMessage = `Relational error on ${entity} occurred, Please make sure you know what you are doing :)`;

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
