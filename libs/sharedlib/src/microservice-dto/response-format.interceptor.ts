import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MicroserviceResponseDto } from '@app/sharedlib/microservice-dto/response.dto';

@Injectable()
export class MicroserviceResponseFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MicroserviceResponseDto> {
    return next
      .handle()
      .pipe(map((data) => new MicroserviceResponseDto(data, 200)));
  }
}
