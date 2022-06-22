import { IRule } from "./rule/IRule"
import { FreeShareDistributionDTO } from "./FreeShareDistributionDTO"

export class RandomlyChooseFreeShareService {
    
    private availableFreeShareRules : IRule[] = []

    public getFreeShareRuleToReward(freeShareDistribution : FreeShareDistributionDTO[]) {
        freeShareDistribution.forEach((freeShareRule) => {
            const canRewardFreeShare = freeShareRule.rule.canRewardFreeShare(freeShareRule.distributionPercentage)
            canRewardFreeShare ? this.availableFreeShareRules.push(freeShareRule.rule) : null
        });

        if(this.availableFreeShareRules.length === 0){
            throw new Error('There is no FreeShareRule available to reward user')
        }

        return this.availableFreeShareRules[Math.floor(Math.random() * this.availableFreeShareRules.length)]
    }
} 