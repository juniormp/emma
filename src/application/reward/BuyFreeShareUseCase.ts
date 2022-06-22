import { OwnerRepository } from "../../infrastructure/repository/Owner/OwnerRepository"
import { GetFreeShareDistributionService } from "../../domain/reward/GetFreeShareDistributionService";
import { RandomlyChooseFreeShareService } from "../../domain/reward/RandomlyChooseFreeShareService";
import { BuyShareService } from "../../domain/reward/BuyShareService";

export class BuyFreeShareUseCase {
    
    private ownerRepository: OwnerRepository
    private getFreeShareDistributionService: GetFreeShareDistributionService
    private randomlyChooseFreeShareService: RandomlyChooseFreeShareService
    private buyShareService: BuyShareService

    constructor(
        ownerRepository?: OwnerRepository, 
        getFreeShareDistributionService?: GetFreeShareDistributionService, 
        randomlyChooseFreeShareService?: RandomlyChooseFreeShareService,
        buyShareService?: BuyShareService,
    ) {
        this.ownerRepository = ownerRepository ? ownerRepository : new OwnerRepository()
        this.getFreeShareDistributionService = getFreeShareDistributionService ? getFreeShareDistributionService : new GetFreeShareDistributionService()
        this.randomlyChooseFreeShareService = randomlyChooseFreeShareService ? this.randomlyChooseFreeShareService : new RandomlyChooseFreeShareService()
        this.buyShareService = buyShareService ? buyShareService : new BuyShareService()
    }

    async execute(firmId: number){
        const firmAccount = await this.ownerRepository.findByFirmId(firmId)
        const freeShareDistribution = await this.getFreeShareDistributionService.getDistribution()
        const freeShareRule =  this.randomlyChooseFreeShareService.getFreeShareRuleToReward(freeShareDistribution)
        await this.buyShareService.buyShare(freeShareRule, firmAccount)
    }
}