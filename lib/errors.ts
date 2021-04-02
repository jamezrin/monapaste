import HttpStatus from 'http-status-codes';
import { NextApiHandler } from 'next';

export type AppErrorProp = {
  type: ErrorType;
  message?: string;
};

export class AppError {
  statusCode: number;
  type: ErrorType;
  message?: string;

  constructor(statusCode: number, type: ErrorType, message?: string) {
    this.statusCode = statusCode;
    this.type = type;
    this.message = message;
  }

  public toProps(): AppErrorProp {
    return {
      type: this.type,
      message: this.message,
    };
  }
}

export function handleErrors(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (err) {
      if (err instanceof AppError) {
        const { statusCode, ...errorProps } = err;
        res.status(statusCode).json(errorProps);
      } else {
        throw err; // just let Next.js handle it
      }
    }
  };
}

enum ErrorType {
  RESOURCE_NOT_FOUND_ERROR = 'RESOURCE_NOT_FOUND_ERROR',
  ACCESS_FORBIDDEN_ERROR = 'ACCESS_FORBIDDEN_ERROR',
}

export const ResourceNotFoundError = new AppError(
  HttpStatus.NOT_FOUND,
  ErrorType.RESOURCE_NOT_FOUND_ERROR,
  'Could not find the requested resource',
);

export const AccessForbiddenError = new AppError(
  HttpStatus.FORBIDDEN,
  ErrorType.ACCESS_FORBIDDEN_ERROR,
  'Not allowed to access this resource',
);
