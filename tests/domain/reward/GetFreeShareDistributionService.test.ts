import { mock, instance, when } from 'ts-mockito'
import { GetFreeShareDistributionService } from "../../../src/domain/reward/GetFreeShareDistributionService";
import { FreeShareRepository } from '../../../src/infrastructure/repository/Reward/FreeShareRepository'
import { FreeShareRule } from '../../../src/domain/reward/rule/FreeShareRule'
const assert = require('chai').assert

describe('Getting the free share distibution already given to users', () => {
    test('should return the right distribution percentage for each free share', async () => {
        const freeShareRepository = mock(FreeShareRepository)
        const ninetyFivePercentageRule:FreeShareRule = mock(FreeShareRule)
        const threePercentageRule:FreeShareRule = mock(FreeShareRule)
        const twoPercentageRule:FreeShareRule = mock(FreeShareRule)
        const getFreeShareDistributionService = new GetFreeShareDistributionService(
            instance(freeShareRepository)
        );

        when(freeShareRepository.findAllFreeShareRules()).thenResolve([
            instance(ninetyFivePercentageRule),
            instance(threePercentageRule),
            instance(twoPercentageRule)
        ]);
        when(ninetyFivePercentageRule.freeShareGiven).thenReturn(95)
        when(threePercentageRule.freeShareGiven).thenReturn(3)
        when(twoPercentageRule.freeShareGiven).thenReturn(2)

        const response = await getFreeShareDistributionService.getDistribution()

        assert.equal(response[0].distributionPercentage, 95)
        assert.equal(response[1].distributionPercentage, 3)
        assert.equal(response[2].distributionPercentage, 2)
    })
})