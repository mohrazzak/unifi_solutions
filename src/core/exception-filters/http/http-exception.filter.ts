import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception?.getStatus() || 400;
    const message =
      exception.message || 'An error occurred, Please try again later.';

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
