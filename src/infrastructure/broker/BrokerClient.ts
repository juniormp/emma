import { BrokerAdapter } from "./BokerAdapter";

export class BrokerClient {

    private brokerAdapter: BrokerAdapter

    constructor(brokerAdapter?: BrokerAdapter) {
        this.brokerAdapter = brokerAdapter ? brokerAdapter : new BrokerAdapter()
    }

    isMarketOpen(): Promise<{ open: boolean, nextOpeningTime: string, nextClosingTime: string }>{
        return this.brokerAdapter.isMarketOpen()
    }

    listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
        return this.brokerAdapter.listTradableAssets()
    }

    buySharesInRewardsAccount(tickerSymbol: string, quantity: number): Promise<{ success: boolean, sharePricePaid: number }> {
        return this.brokerAdapter.buySharesInRewardsAccount(tickerSymbol, quantity)
    }

    getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }> {
        return this.brokerAdapter.getLatestPrice(tickerSymbol)
    }

    getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> { 
        return this.brokerAdapter.getRewardsAccountPositions()
    }

    moveSharesFromRewardsAccount(toAccount: string, tickerSymbol: string, quantity: number): Promise<{ success: boolean }> {
        return this.brokerAdapter.moveSharesFromRewardsAccount(toAccount, tickerSymbol, quantity)
    }
}