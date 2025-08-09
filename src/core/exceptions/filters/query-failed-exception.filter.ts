import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { format } from 'date-fns';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { name, message } = exception;
    const driverError = exception.driverError as any;

    let statusCode = HttpStatus.BAD_REQUEST;
    let errorMessage = 'A database error occurred';

    switch (driverError?.code) {
      case '23505': // Unique violation (Postgres)
      case 'ER_DUP_ENTRY': // Duplicate entry (MySQL)
        let duplicateField = '';
        let duplicateValue = '';
        if (driverError?.detail) {
          const match = driverError.detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
          if (match) {
            duplicateField = match[1];
            duplicateValue = match[2];
          }
        } else if (driverError?.message) {
          const match = driverError.message.match(
            /Duplicate entry '(.+)' for key '(.+)'/,
          );
          if (match) {
            duplicateValue = match[1];
            duplicateField = match[2];
          }
        }
        if (duplicateField && duplicateValue) {
          errorMessage = `Duplicate value '${duplicateValue}' for field '${duplicateField}'. This value must be unique.`;
        } else {
          errorMessage =
            'Duplicate value for a unique field. This value must be unique.';
        }
        statusCode = HttpStatus.CONFLICT;
        break;
      case '23503': // Foreign key violation (Postgres)
      case 'ER_NO_REFERENCED_ROW_2': // Foreign key constraint fails (MySQL)
        errorMessage = 'Foreign key constraint violation';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case '23502': // Not null violation (Postgres)
      case 'ER_BAD_NULL_ERROR': // Column cannot be null (MySQL)
        errorMessage = 'A required field is missing';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case '42703': // Undefined column (Postgres)
      case 'ER_BAD_FIELD_ERROR': // Unknown column (MySQL)
        errorMessage = 'Unknown column in database operation';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case '42P01': // Undefined table (Postgres)
      case 'ER_NO_SUCH_TABLE': // Table doesn't exist (MySQL)
        errorMessage = 'Table does not exist';
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      default:
        errorMessage = message || 'A database error occurred';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
    }
    const startTime = request['startTime'];
    const responseTime = startTime ? `${Date.now() - startTime}ms` : 'N/A';

    response.status(statusCode).json({
      success: false,
      statusCode,
      path: request.url,
      message: errorMessage,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      responseTime,
    });
  }
}
