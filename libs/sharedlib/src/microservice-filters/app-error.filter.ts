import { ArgumentsHost, Catch, Provider } from '@nestjs/common';
import {
  ForbiddenError,
  InternalError,
  ValidationError,
} from '@app/sharedlib/errors';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto';
import { APP_FILTER } from '@nestjs/core';

@Catch(InternalError)
class AppInternalErrorFilters extends BaseRpcExceptionFilter {
  catch(exception: InternalError, host: ArgumentsHost): Observable<any> {
    const fmtErr = new RpcException(
      new MicroserviceResponseDto({ exception }, 500, exception.message),
    );
    return super.catch(fmtErr, host);
  }
}

@Catch(ValidationError)
class AppValidationErrorFilters extends BaseRpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): Observable<any> {
    const fmtErr = new RpcException(
      new MicroserviceResponseDto(exception, 400, exception.message),
    );
    return super.catch(fmtErr, host);
  }
}

@Catch(ForbiddenError)
class AppForbiddenErrorFilters extends BaseRpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): Observable<any> {
    const fmtErr = new RpcException(
      new MicroserviceResponseDto(exception, 403, exception.message),
    );
    return super.catch(fmtErr, host);
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
