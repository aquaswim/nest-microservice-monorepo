import { ArgumentsHost, Catch, Provider } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto';
import { APP_FILTER } from '@nestjs/core';

@Catch(EntityNotFoundError)
class TypeormEntityNotFoundFilter extends BaseRpcExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): Observable<any> {
    return super.catch(
      new RpcException(
        new MicroserviceResponseDto(null, 404, exception.message),
      ),
      host,
    );
  }
}

// register all filter in this arrays
export const TypeormErrorFiltersProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: TypeormEntityNotFoundFilter,
  },
];
