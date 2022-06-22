import { IRule } from "./rule/IRule"
import { IFreeShareRepository } from "../../infrastructure/repository/Reward/IFreeShareRepository"
import { FreeShareRepository } from "../../infrastructure/repository/Reward/FreeShareRepository"
import { FreeShareDistributionDTO } from "./FreeShareDistributionDTO"

export class GetFreeShareDistributionService {
    
    private freeShareRepository: IFreeShareRepository

    constructor(freeShareRepository?: IFreeShareRepository) {
        this.freeShareRepository = freeShareRepository ? freeShareRepository : new FreeShareRepository()
    }

    async getDistribution() {
        const freeShareRules = await this.freeShareRepository.findAllFreeShareRules()
        const freeShareGivenTotalAmount = this.getGivenFreeShareTotalAmount(freeShareRules)
        return this.getFreeShareDistribution(freeShareRules, freeShareGivenTotalAmount)
    }

    private getGivenFreeShareTotalAmount(freeShareRules: IRule[]): number {
        return freeShareRules.reduce((accumulator, freeShareRule) => {
            return accumulator + freeShareRule.freeShareGiven
        }, 0)
    }

    private getFreeShareDistribution(freeShareRules: IRule[], freeShareGivenTotalAmount: number) : FreeShareDistributionDTO[] {
        return freeShareRules.map((freeShareRule) => {
            const percentage = freeShareRule.freeShareGiven !== 0 ? ((freeShareRule.freeShareGiven * 100) / freeShareGivenTotalAmount) : 0;
            return new FreeShareDistributionDTO(freeShareRule, percentage)
        })
    }
}