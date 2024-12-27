import { ArgumentsHost, Catch, Provider } from '@nestjs/common';
import {
  BaseError,
  ForbiddenError,
  InternalError,
  ValidationError,
} from '@app/sharedlib/errors';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto';
import { APP_FILTER } from '@nestjs/core';

abstract class BaseAppErrorFilter<
  T extends BaseError,
> extends BaseRpcExceptionFilter {
  abstract get httpCode(): number;

  getBody(exception: T): unknown {
    return exception;
  }

  catch(exception: T, host: ArgumentsHost): Observable<any> {
    const fmtErr = new RpcException(
      new MicroserviceResponseDto(
        this.getBody(exception),
        this.httpCode,
        exception.message,
      ),
    );
    return super.catch(fmtErr, host);
  }
}

@Catch(InternalError)
class AppInternalErrorFilters extends BaseAppErrorFilter<InternalError> {
  get httpCode(): number {
    return 500;
  }

  getBody(exception: InternalError): unknown {
    return { exception };
  }
}

@Catch(ValidationError)
class AppValidationErrorFilters extends BaseAppErrorFilter<ValidationError> {
  get httpCode(): number {
    return 400;
  }
}

@Catch(ForbiddenError)
class AppForbiddenErrorFilters extends BaseAppErrorFilter<ForbiddenError> {
  get httpCode(): number {
    return 403;
  }
}

// register all filter in this arrays
export const AppErrorFiltersProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AppInternalErrorFilters,
  },
  {
    provide: APP_FILTER,
    useClass: AppValidationErrorFilters,
  },
  {
    provide: APP_FILTER,
    useClass: AppForbiddenErrorFilters,
  },
];
