import { ITransaction } from '@/database/domain/interfaces/transaction.interface';

export class TransactionService implements ITransaction {
  beginTransaction(): Promise<void> {
    return Promise.resolve(undefined);
  }

  commit(): Promise<void> {
    return Promise.resolve(undefined);
  }

  rollback(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
