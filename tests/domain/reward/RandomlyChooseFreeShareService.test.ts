import { mock, instance, when, spy } from 'ts-mockito'
import { RandomlyChooseFreeShareService } from '../../../src/domain/reward/RandomlyChooseFreeShareService'
import { FreeShareRule } from '../../../src/domain/reward/rule/FreeShareRule'
import { FreeShareDistributionDTO } from '../../../src/domain/reward/FreeShareDistributionDTO'
import { IRule } from '../../../src/domain/reward/rule/IRule'
const assert = require('chai').assert
const expect = require('chai').expect

describe('Getting the free share distibution already given to users', () => {
    test('should return the right distribution percentage for each free share rule', async () => {
        const ninetyFivePercentageRule:FreeShareRule = mock(FreeShareRule)
        const threePercentageRule:FreeShareRule = mock(FreeShareRule)
        const twoPercentageRule:FreeShareRule = mock(FreeShareRule)
        const availableFreeShareRules: IRule[] = []
        const availableFreeShareRulesMock = spy(availableFreeShareRules)
        const randomlyChooseFreeShareService = new RandomlyChooseFreeShareService()

        when(ninetyFivePercentageRule.canRewardFreeShare(95)).thenReturn(true)
        when(ninetyFivePercentageRule.name).thenReturn('NinetyFivePercentageRule')
        when(threePercentageRule.canRewardFreeShare(3)).thenReturn(true)
        when(threePercentageRule.name).thenReturn('ThreePercentageRule')
        when(twoPercentageRule.canRewardFreeShare(2)).thenReturn(true)
        when(twoPercentageRule.name).thenReturn('TwoPercentageRule')
        
        const freeShares = [
            new FreeShareDistributionDTO(instance(ninetyFivePercentageRule), 95),
            new FreeShareDistributionDTO(instance(threePercentageRule), 3),
            new FreeShareDistributionDTO(instance(twoPercentageRule), 2)
        ];

        const result = randomlyChooseFreeShareService.getFreeShareRuleToReward(freeShares)
    })
})