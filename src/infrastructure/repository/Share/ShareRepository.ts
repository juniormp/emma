import { IShareRepository } from "./IShareRepository";
import { PrismaClient } from "@prisma/client";
import { Share } from "../../../domain/share/Share";

export class ShareRepository implements IShareRepository{
    
    private prisma: PrismaClient

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma ? prisma : new PrismaClient({})
    }

    async create(tickerSymbol: string, quantity: number, accountId: number): Promise<Share> {
        return await this.prisma.share.create({
            data: {
                tickerSymbol: tickerSymbol,
                quantity: quantity,
                accountId: accountId
            }
        });
    }

    async moveShareFromTo(shareId: number, from: number, to: number): Promise<Share> {
        return await this.prisma.share.update({
            where: {
                id: shareId
            },
            data: {
               accountId: to
            }
        });
    }
}