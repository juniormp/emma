import { IAccountRepository } from "./IAccountRepository";
import { PrismaClient } from "@prisma/client";
import { Account } from "../../../domain/account/Account";

export class AccountRepository implements IAccountRepository{
    
    private prisma: PrismaClient

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma ? prisma : new PrismaClient({})
    }

    async findByOwnerId(userId: number): Promise<Account>{
        const result  = await this.prisma.account.findFirst({
            where: {
                ownerId: userId
            },
            include: {
                Share: true
            },
        });

        return new Account(result.id, result.brokerAccount, result.cash, result.Share);
    }

    async findByBrokerAccount(brokerAccount: string): Promise<Account> {
        const result  = await this.prisma.account.findFirst({
            where: {
                brokerAccount: brokerAccount
            },
            include: {
                Share: true
            },
        });

        return new Account(result.id, result.brokerAccount, result.cash, result.Share);
    }

    async update(account: Account): Promise<void> {
        await this.prisma.account.update({
            where: {
                ownerId: account.id
            },
            data: {
                cash: account.cash
            },
        });
    }
}