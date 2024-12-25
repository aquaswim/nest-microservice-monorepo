import { UserModule } from './user.module';
import { TCPServiceBoot } from '@app/sharedlib/service-boot';

TCPServiceBoot('user', UserModule);
