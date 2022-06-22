import { IRule } from "./rule/IRule"

export class FreeShareDistributionDTO {
    rule: IRule
    distributionPercentage: number

    constructor(rule: IRule, distributionPercentage: number) {
        this.rule = rule
        this.distributionPercentage = distributionPercentage
    }
}
