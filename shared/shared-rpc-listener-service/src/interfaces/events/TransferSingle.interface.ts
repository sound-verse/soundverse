import { BigNumber } from "ethers";

export interface ITransferSingle {
  from: string;
  to: string;
  id: BigNumber;
  value: BigNumber;
}
