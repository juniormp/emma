import { Owner } from "../../../domain/owner/Owner"

export interface IOwnerRepository {
  findByFirmId(firmId: number): Promise<Owner>
}