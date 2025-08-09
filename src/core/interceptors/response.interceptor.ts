import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { format } from 'date-fns';
import { QueryFailedError } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator';

export type Response<T> = {
  success: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T;
  timestamp: string;
  responseTime: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = Date.now();

    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context, now)),
      // catchError((err: Error) =>
      //   throwError(() => this.errorHandler(err, context, now)),
      // ),
    );
  }

  errorHandler(exception: Error, context: ExecutionContext, startTime: number) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    HttpException;
    let status: number;
    if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseTime = `${Date.now() - startTime}ms`;

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      message: exception.message,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      responseTime,
    });
  }

  responseHandler(res: any, context: ExecutionContext, startTime: number) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;

    const responseTime = `${Date.now() - startTime}ms`;
    const message =
      this.reflector?.get<string>(
        RESPONSE_MESSAGE_METADATA,
        context.getHandler(),
      ) || 'Successful response';

    return {
      success: true,
      path: request.url,
      statusCode,
      message,
      data: res,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      responseTime,
    };
  }
}
