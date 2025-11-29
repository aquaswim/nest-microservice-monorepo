import { TCPServiceBoot } from '@app/sharedlib/service-boot';
import { UserModule } from './user.module';

TCPServiceBoot('user', UserModule);
