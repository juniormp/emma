import { IOwnerRepository } from "./IOwnerRepository";
import { PrismaClient } from "@prisma/client";
import { Owner } from "../../../domain/owner/Owner";

export class OwnerRepository implements IOwnerRepository{
    
    private prisma: PrismaClient

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma ? prisma : new PrismaClient({})
    }


    async findByFirmId(firmId: number): Promise<Owner> {
        const result  = await this.prisma.owner.findFirst({
            where: {
                firmId: firmId
            },
            include : {
                Account: true
            }
        });

        return new Owner(result.id, result.ownerableType, result.userId, result.firmId, result.accountId, result.Account);
    }
}