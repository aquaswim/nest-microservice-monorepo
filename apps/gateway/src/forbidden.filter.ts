import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(ForbiddenException)
export class ForbiddenFilter extends BaseExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const fmtError = new HttpException({ message: 'Forbidden' }, 403, {
      cause: exception,
    });
    super.catch(fmtError, host);
  }
}
