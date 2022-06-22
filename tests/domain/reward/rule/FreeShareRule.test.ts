import { FreeShareRule } from '../../../../src/domain/reward/rule/FreeShareRule'
const expect = require('chai').expect
const chai = require('chai').chai

describe('Checking if NinetyFivePercentRule can be rewarded', () => {
  test('should return positive if distributed percentage has not reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'NinetyFivePercentRule', 95, 3, 10, 0)
   
    let distributedPercentage = 0
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true

    distributedPercentage = 94
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true
  })

  test('should return negative if distributed percentage has reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'NinetyFivePercentRule', 95, 3, 10, 0)
   
    let distributedPercentage = 95
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false

    distributedPercentage = 96
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false
  })
})

describe('Checking if ThreePercentageRule can be rewarded', () => {
  test('should return positive if distributed percentage has not reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'ThreePercentageRule', 3, 10, 25, 0)
   
    let distributedPercentage = 0
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true

    distributedPercentage = 2
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true
  })

  test('should return negative if distributed percentage has reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'ThreePercentageRule', 3, 10, 25, 0)
   
    let distributedPercentage = 3
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false

    distributedPercentage = 4
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false
  })
})

describe('Checking if TwoPercentageRule can be rewarded', () => {
  test('should return positive if distributed percentage has not reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'TwoPercentageRule', 2, 25, 100, 0)
   
    let distributedPercentage = 0
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true

    distributedPercentage = 1
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.true
  })

  test('should return negative if distributed percentage has reached the limit', () => {
    const freeShareRule = new FreeShareRule(1, 'TwoPercentageRule', 2, 25, 100, 0)
   
    let distributedPercentage = 2
    let result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false

    distributedPercentage = 3
    result = freeShareRule.canRewardFreeShare(distributedPercentage)
    expect(result).to.be.false
  })
})

describe('Checking if ditributed percentage is valid', () => {
  test('should return positive if distributed percentage is greater than or equal to 0', () => {
    const freeShareRule = new FreeShareRule(1, 'NinetyFivePercentRule', 95, 3, 10, 0)
   
    let distributedPercentage = 0
    expect(() => {
      freeShareRule.canRewardFreeShare(distributedPercentage)
    }).to.not.throw('Distributed Percantage is a negative number');

    distributedPercentage = 1
    expect(() => {
      freeShareRule.canRewardFreeShare(distributedPercentage)
    }).to.not.throw('Distributed Percantage is a negative number');
  })

  test('should throw exception if distributed percentage is less than 0', () => {
    const freeShareRule = new FreeShareRule(1, 'NinetyFivePercentRule', 95, 3, 10, 0)
   
    let distributedPercentage = -1
    expect(() => {
      freeShareRule.canRewardFreeShare(distributedPercentage)
    }).to.throw('Distributed Percantage is a negative number');
  })
})