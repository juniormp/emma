import { IFirmRepository } from "./IFirmRepository";
import { PrismaClient } from "@prisma/client";

export class FirmRepository implements IFirmRepository{
    
    private prisma: PrismaClient

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma ? prisma : new PrismaClient({})
    }
}