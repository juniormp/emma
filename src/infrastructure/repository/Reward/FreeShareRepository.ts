import { IFreeShareRepository } from "./IFreeShareRepository";
import { PrismaClient } from "@prisma/client";
import { FreeShareRule } from "../../../domain/reward/rule/FreeShareRule";
import { Console } from "console";

export class FreeShareRepository implements IFreeShareRepository{
    
    private prisma: PrismaClient

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma ? prisma : new PrismaClient({})
    }

    async findAllFreeShareRules(): Promise<FreeShareRule[]> {
        const result  = await this.prisma.freeShareRule.findMany();

        const freeShareRules: FreeShareRule[] = []

        result.map(async (freeShare) => {
                freeShareRules.push(
                    new FreeShareRule(
                        freeShare.id,
                        freeShare.name,
                        freeShare.percentage, 
                        freeShare.minAmount, 
                        freeShare.maxAmount, 
                        freeShare.freeShareGiven
                    )
                )
            })
        
        return freeShareRules
    }

    async update(freeShareId: number, quantity: number): Promise<void> {
        await this.prisma.freeShareRule.update(
            {
                where: {
                    id: freeShareId
                },
                data: {
                  freeShareGiven: quantity,
                },
              }
        );
    }
}