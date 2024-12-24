import { ValidationError as cvValidationError } from 'class-validator';

export abstract class BaseError extends Error {}

export class ValidationError extends BaseError {
  constructor() {
    super('Validation Error');
  }

  public validationErrors: Record<string, any> = {};

  static fromClassValidatorErrors(
    validateRes: cvValidationError[],
  ): ValidationError {
    const fmtErr = new ValidationError();
    // add validateRes
    validateRes.forEach((err) => {
      fmtErr.validationErrors[err.property] = err.constraints;
    });
    return fmtErr;
  }
}

export class InternalError extends BaseError {
  constructor(message = 'Internal Error') {
    super(message);
  }
}
