import { Injectable } from '@nestjs/common';
import {
  ContractType,
  ERC721MasterMintEventReturnValues,
  EventType,
  IEventMessage,
} from '@soundverse/shared-rpc-listener-service';
import { NftService } from '../nft/nft.service';

@Injectable()
export class EventService {
  constructor(private nftService: NftService) {}

  async handleEvent(event: IEventMessage): Promise<void> {
    console.log(event);
    const contractType: ContractType = event.contractType;
    const eventType: EventType = event.event;
    const nullAddress = '0x0000000000000000000000000000000000000000';
    switch (contractType) {
      case ContractType.ERC721: {
        switch (eventType) {
          case EventType.MASTER_MINT_EVENT: {
            const returnValues: ERC721MasterMintEventReturnValues = event.returnValues;
            if (returnValues.from === nullAddress) {
              await this.nftService.setTokenId(parseInt(returnValues.id), event.address, event.chainId);
            }
            break;
          }
        }
        break;
      }
    }
  }
}
