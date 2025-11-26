import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  log = new Logger(this.constructor.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    this.log.error('service general error received', exception);
    const fmtErr = new RpcException(
      new MicroserviceResponseDto(exception, 500, 'Internal Server Error'),
    );
    return super.catch(fmtErr, host);
  }
}

export * from './app-error.filter';
export * from './typeorm.filter';
