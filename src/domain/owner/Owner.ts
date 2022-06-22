import { runInThisContext } from "vm"
import { Account } from "../account/Account"

export class Owner {
    id: number
    ownerableType: String
    userId?: number
    firmId?: number
    accountId?: number
    account?: Account

    constructor(id: number, ownerableType: String, userId: number, firmId: number, accountId: number, account: Account){
        this.id = id
        this.ownerableType = ownerableType
        this.userId = userId
        this.firmId = firmId
        this.accountId = accountId
        this.account = account
    }
}