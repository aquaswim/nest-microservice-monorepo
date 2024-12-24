import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const fmtErr = new RpcException(
      new MicroserviceResponseDto(exception, 500, 'Internal Server Error'),
    );
    return super.catch(fmtErr, host);
  }
}

export * from './app-error.filter';
