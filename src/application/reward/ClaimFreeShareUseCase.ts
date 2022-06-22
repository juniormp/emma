import { BrokerClient } from "../../infrastructure/broker/BrokerClient";
import { AccountRepository } from "../../infrastructure/repository/Account/AccountRepository";
import { ShareRepository } from "../../infrastructure/repository/Share/ShareRepository";
import { Share } from "../../domain/share/Share";

export class ClaimFreeShareUseCase {
    private accountRepository: AccountRepository
    private brokerClient: BrokerClient
    private shareRepository: ShareRepository

    constructor(
        accountRepository?: AccountRepository,
        brokerClient?: BrokerClient,
        shareRepository?: ShareRepository
    ) {
        this.accountRepository = accountRepository ? accountRepository : new AccountRepository()
        this.brokerClient = brokerClient ? brokerClient : new BrokerClient()
        this.shareRepository = shareRepository ? shareRepository : new ShareRepository()
        
    }

    async execute(userId: number): Promise<Share> {
        const accountPosition = await this.brokerClient.getRewardsAccountPositions()
        const userAccount = await this.accountRepository.findByOwnerId(userId)
        const firmAccount = await this.accountRepository.findByBrokerAccount('FAB001')

        if(accountPosition.length == 0 && firmAccount.shares.length == 0) {
            throw new Error('There is no rewards possition in broker account')
        }
    
        const rewardToGive = firmAccount.shares[Math.floor(Math.random() * firmAccount.shares.length)]
        const quantity = 1

        const result = await this.brokerClient.moveSharesFromRewardsAccount(userAccount.brokerAccount, rewardToGive.tickerSymbol, quantity);

        if(!result.success) {
            throw new Error('Failed to move rewards from firm account to user account')
        }
       
        const share = await this.shareRepository.moveShareFromTo(rewardToGive.id, firmAccount.id, userAccount.id)
    
        return share
    }
}