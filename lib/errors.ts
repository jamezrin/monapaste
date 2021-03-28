export type Error = {
  type: ErrorType;
  message?: string;
};

const error = (type: ErrorType, message?: string): Error => ({ type, message });

enum ErrorType {
  RESOURCE_NOT_FOUND_ERROR = 'RESOURCE_NOT_FOUND_ERROR',
  ACCESS_FORBIDDEN_ERROR = 'ACCESS_FORBIDDEN_ERROR',
}

export const ResourceNotFoundError = error(ErrorType.RESOURCE_NOT_FOUND_ERROR);
export const AccessForbiddenError = error(ErrorType.ACCESS_FORBIDDEN_ERROR);
