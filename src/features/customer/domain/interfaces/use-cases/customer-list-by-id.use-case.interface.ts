import { User } from '@/features/user/domain/core/user';

export interface ICustomerListByIdUseCase {
  execute(userUuid: string): Promise<User>;
}
