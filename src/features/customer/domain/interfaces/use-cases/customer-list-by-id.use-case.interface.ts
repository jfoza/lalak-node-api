import { User } from '@/features/user/domain/entities/user';

export interface ICustomerListByIdUseCase {
  execute(userUuid: string): Promise<User>;
}
