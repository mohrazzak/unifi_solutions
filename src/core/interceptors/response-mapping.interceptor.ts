import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators'; // Import map from rxjs/operators
import { Observable } from 'rxjs';
import { IReturnedResponse } from 'src/shared/interfaces/response.interface';
import { Response } from 'express';

@Injectable()
export class ResponseMappingInterceptor
  implements NestInterceptor<IReturnedResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<IReturnedResponse>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const finalResponse = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((returnedResponse: IReturnedResponse) => {
        if (!returnedResponse) return;
        const response = {
          status: true,
          path: request.path,
          data: null,
          ...returnedResponse,
        };

        finalResponse.status(returnedResponse.statusCode ?? 500);

        return response;
      }),
    );
  }
}
