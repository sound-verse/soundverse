import { IEvent } from "./";
import { ContractType } from "../..";

export interface IEventMessage extends IEvent {
  contractType: ContractType;
  chainId: number;
}
