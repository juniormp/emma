export class Share {
    id: number
    tickerSymbol: string
    quantity: number
    accountId: number

    constructor(id: number, tickerSymbol: string, quantity: number, accountId: number){
        this.id = id
        this.tickerSymbol = tickerSymbol
        this.quantity = quantity
        this.accountId = accountId
    }
}