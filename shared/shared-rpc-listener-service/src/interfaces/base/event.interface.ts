import { EventType } from "../../enum/EventType.enum";

export type IEvent<T = any> = {
  address: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  id: string;
  returnValues: T;
  event: EventType;
  signature: string;
  raw: {
    data: string;
    topics: string[];
  };
};
