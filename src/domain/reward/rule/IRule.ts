export interface IRule {
    id: number
    name: String
    percentage: number 
    minAmount: number 
    maxAmount: number 
    freeShareGiven: number

    canRewardFreeShare(percentage: number): boolean
    addGivenReward(quantity: number): void 
}