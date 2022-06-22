export interface IBroker {
    isMarketOpen(): Promise<{ open: boolean, nextOpeningTime: string, nextClosingTime: string }>
    listTradableAssets(): Promise<Array<{ tickerSymbol: string }>>
    buySharesInRewardsAccount(tickerSymbol: string, quantity: number): Promise<{ success: boolean, sharePricePaid: number }>
    getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }>
    getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> 
    moveSharesFromRewardsAccount(toAccount: string, tickerSymbol: string, quantity: number): Promise<{ success: boolean }>
}