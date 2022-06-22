import { IRule } from "./IRule"

export class FreeShareRule implements IRule {
    id: number
    name: string
    percentage: number = 0
    minAmount: number = 0
    maxAmount: number = 0
    freeShareGiven: number = 0

    constructor(id: number, name: string, percentage: number, minAmount: number, maxAmount: number, freeShareGiven: number) {
        this.id = id
        this.name = name
        this.percentage = percentage
        this.minAmount = minAmount
        this.maxAmount = maxAmount
        this.freeShareGiven = freeShareGiven
    }

    canRewardFreeShare(distributedPercentage: number): boolean {
        if(distributedPercentage < 0) {
            throw new Error('Distributed Percantage is a negative number')
        } 
        
        return distributedPercentage < this.percentage  ? true : false;
    }

    addGivenReward(quantity: number): void {
        this.freeShareGiven = this.freeShareGiven + quantity
    }
}