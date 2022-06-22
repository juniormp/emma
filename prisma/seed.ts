import { PrismaClient } from "@prisma/client"

const prisma =  new PrismaClient()

async function main() {

  await prisma.owner.create({
    data: {
        ownerableType: 'Firm',
        Firm: {
            create: {
              name: 'Emma',
            }
        },
        Account : {
          create: {
            brokerAccount : 'FAB001',
            ownerId: 1,
            cash: 1000
          }
        }
    }
  })

    await prisma.owner.create({
        data: {
            ownerableType: 'User',
            User: {
                create: {
                    name: 'Mauricio Jr',
                    email: 'junior9771@gmail.com'
                }
            },
            Account : {
              create: {
                brokerAccount : 'FAB002',
                ownerId: 2,
                cash: 500
              }
            }
        }
    })

    await prisma.freeShareRule.createMany({
      data: [
        {
          name: 'NinetyFivePercentRule',
          freeShareGiven: 0,
          minAmount: 3,
          maxAmount: 10,
          percentage: 95
        },
        {
          name: 'ThreePercentageRule',
          freeShareGiven: 0,
          minAmount: 10,
          maxAmount: 25,
          percentage: 3
        },
        {
          name: 'TwoPercentageRule',
          freeShareGiven: 0,
          minAmount: 25,
          maxAmount: 100,
          percentage: 2
        }
      ]
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })