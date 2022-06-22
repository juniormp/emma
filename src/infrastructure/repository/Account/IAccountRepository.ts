import { Account } from "../../../domain/account/Account";

export interface IAccountRepository {
  findByOwnerId(userId: number): Promise<Account>
  update(account: Account): Promise<void> 
}