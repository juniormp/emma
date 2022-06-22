import { Account } from "../../../domain/account/Account";

export interface IShareRepository {
  create(tickerSymbol: string, quantity: number, accountId: number): void
}