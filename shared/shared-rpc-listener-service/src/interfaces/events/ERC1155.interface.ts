import { IEvent } from "../base/event.interface";

export interface ERC1155TransferSingleReturnValues {
  operator: string;
  from: string;
  to: string;
  id: string;
  value: string;
}
