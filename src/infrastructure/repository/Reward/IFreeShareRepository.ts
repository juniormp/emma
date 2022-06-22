import { FreeShareRule } from "../../../domain/reward/rule/FreeShareRule";
import { IRule } from "../../../domain/reward/rule/IRule";

export interface IFreeShareRepository {
  findAllFreeShareRules(): Promise<FreeShareRule[]> 
  update(freeShareId: number, quantity: number): Promise<void>
}