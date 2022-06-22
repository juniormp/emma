import { Share } from "../../domain/share/Share"

export class Account {
    id: number
    brokerAccount: string
    cash: number
    shares: Share[]

    constructor(id: number, brokerAccount: string, cash: number, shares: Share[]){
        this.id = id
        this.brokerAccount = brokerAccount
        this.cash = cash
        this.shares = shares
    }


    debit(amount: number): void {
        this.cash = this.cash - amount

        if(this.cash < 0 ) {
            throw new Error('Account has no sufficent cash to complete the transaction')
        }
    }
}