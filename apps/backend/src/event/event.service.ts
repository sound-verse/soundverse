import { Injectable } from '@nestjs/common';
import {
  ContractType,
  ERC1155TransferSingleReturnValues,
  EventType,
  IEventMessage,
} from '@soundverse/shared-rpc-listener-service';
import { NftService } from '../nft/nft.service';

@Injectable()
export class EventService {
  constructor(private nftService: NftService) {}

  async handleEvent(event: IEventMessage): Promise<void> {
    const contractType: ContractType = event.contractType;
    const eventType: EventType = event.event;
    const nullAddress = '0x0000000000000000000000000000000000000000';
    switch (contractType) {
      case ContractType.ERC1155: {
        switch (eventType) {
          case EventType.TRANSFER_SINGLE: {
            const returnValues: ERC1155TransferSingleReturnValues = event.returnValues;
            if (returnValues.from === nullAddress) {
              await this.nftService.verifyNft(parseInt(returnValues.id), event.address);
            }
          }
        }
      }
    }
  }
}
