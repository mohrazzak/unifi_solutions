import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';

@Catch(InternalServerErrorException, Error)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = 500;
    const message =
      (exception instanceof InternalServerErrorException &&
        exception.message) ||
      'System error, We will do our best on fixing it.';
    response.status(statusCode).json({
      status: false,
      statusCode,
      message,
      path: request.path,
      time: new Date().toISOString(),
      data: null,
    });
  }
}
