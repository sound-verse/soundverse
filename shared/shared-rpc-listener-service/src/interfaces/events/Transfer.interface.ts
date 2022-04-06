import { BigNumber } from "ethers";

export interface ITransfer {
  from: string;
  to: string;
  tokenId: BigNumber;
}
