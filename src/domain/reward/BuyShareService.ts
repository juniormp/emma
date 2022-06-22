import { IBroker } from "../../infrastructure/broker/IBroker"
import { BrokerClient } from "../../infrastructure/broker/BrokerClient"
import { IRule } from "./rule/IRule"
import { AccountRepository } from "../../infrastructure/repository/Account/AccountRepository"
import { ShareRepository } from "../../infrastructure/repository/Share/ShareRepository"
import { Owner } from "../owner/Owner"
import { FreeShareRepository } from "../../infrastructure/repository/Reward/FreeShareRepository";

export class BuyShareService {
   
    private brokerClient : IBroker
    private accountRepository: AccountRepository
    private shareRepository: ShareRepository
    private freeShareRepository: FreeShareRepository

    constructor(
        brokerClient?: IBroker,
        accountRepository?: AccountRepository,
        shareRepository?: ShareRepository,
        freeShareRepository? : FreeShareRepository
    ) {
        this.brokerClient = brokerClient ? brokerClient : new BrokerClient()
        this.accountRepository = accountRepository ? accountRepository : new AccountRepository()
        this.shareRepository = shareRepository ? shareRepository : new ShareRepository()
        this.freeShareRepository = freeShareRepository ? freeShareRepository : new FreeShareRepository()
    }

    async buyShare(freeShareRule: IRule, owner: Owner) {
        await this.isMarketOpen()
        const tradableAssets = await this.brokerClient.listTradableAssets() 
        const availableShares = await this.getAvailableSharesToBuy(tradableAssets, owner.account.cash) 
        const shareToBuy = this.getFreeShareToBuy(availableShares)

        const quantity = 1;
        const isSucessful = this.brokerClient.buySharesInRewardsAccount(shareToBuy.tickerSymbol, quantity) 
        
        const { success, sharePricePaid } = (await isSucessful)
        
        if(!success) {
            throw new Error("Failed purchase")
        }

        this.shareRepository.create(shareToBuy.tickerSymbol, quantity, owner.account.id)
        
        freeShareRule.addGivenReward(quantity)
        this.freeShareRepository.update(freeShareRule.id, freeShareRule.freeShareGiven)
     
        const ownerAccount = await this.accountRepository.findByOwnerId(owner.id)
        ownerAccount.debit(sharePricePaid)
        this.accountRepository.update(ownerAccount)

        return {
            success: success,
            share: shareToBuy.tickerSymbol,
            sharePricePaid: sharePricePaid,
            quantity: quantity
        }
    }

    private async isMarketOpen() {
        const isMarketOpen = this.brokerClient.isMarketOpen()
        const { open, nextOpeningTime, nextClosingTime } = (await isMarketOpen)

        if(!open) {
            throw new Error('Market is closed')
        }

        return (await isMarketOpen)
    }

    private async getAvailableSharesToBuy(shares: Array<{ tickerSymbol: string }>, cashAccount: number) {
        const availableSharesToBuy = []
        for (const iterator in shares) {
            const result = this.brokerClient.getLatestPrice(shares[iterator].tickerSymbol)
            const { sharePrice } = (await result)
            
            if(cashAccount > sharePrice) {
                availableSharesToBuy.push(shares[iterator]) 
            }    
        }

        if(availableSharesToBuy.length == 0) {   
            throw new Error("Insuficient cash in owner's account")
        }

        return availableSharesToBuy
    }

    private getFreeShareToBuy(availableShares: Array<{ tickerSymbol: string }>) {
       return availableShares[Math.floor(Math.random() * availableShares.length)]
    }
}