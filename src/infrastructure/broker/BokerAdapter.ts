import { rejects } from "assert";
import { resolve } from "path";
import { IBroker } from "./IBroker";

export class BrokerAdapter implements IBroker {

    private date: Date = new Date();  

    isMarketOpen(): Promise<{ open: boolean, nextOpeningTime: string, nextClosingTime: string }> {
        return Promise.resolve({
            open: true,
            nextOpeningTime: '',
            nextClosingTime: ''
        });
    }

    listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
        return Promise.resolve([
            {
                tickerSymbol: 'XPY',
            },
            {
                tickerSymbol: 'BEN',
            },
            {
                tickerSymbol: 'FIS',
            }
        ])
    }

    buySharesInRewardsAccount(tickerSymbol: string, quantity: number): Promise<{ success: boolean, sharePricePaid: number }> {
        return Promise.resolve({
            success: true,
            sharePricePaid: 3
        })
    }

    getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }> {
        return Promise.resolve({
            sharePrice: 1
        })
    }

    getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string, quantity: number, sharePrice: number }>> {
        return Promise.resolve([{
            tickerSymbol: '',
            quantity: 1,
            sharePrice: 3
        }])
    }

    moveSharesFromRewardsAccount(toAccount: string, tickerSymbol: string, quantity: number): Promise<{ success: boolean }> {
        return Promise.resolve({
            success: true
        })
    }
}