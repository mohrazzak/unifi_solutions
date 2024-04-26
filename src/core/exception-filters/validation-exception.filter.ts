import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception?.getStatus() || HttpStatus.UNPROCESSABLE_ENTITY;
    const message = "Validation error";

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      statusCode,
      message,
      path: request.path,
      time: new Date().toISOString(),
      data: null,
    });
  }
}
