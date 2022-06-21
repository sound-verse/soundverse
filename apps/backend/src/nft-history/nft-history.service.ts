import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { EventType } from '@soundverse/shared-rpc-listener-service';
import { Model, Types } from 'mongoose';
import { NftHistory, NftHistoryDocument } from './nft-history.schema';

interface CreateNftHistoryProps {
  nft: Types.ObjectId;
  from: Types.ObjectId;
  to?: Types.ObjectId;
  selling?: Types.ObjectId;
  eventType: EventType;
  contractAddress: string;
  transactionHash: string;
}

@Injectable()
export class NftHistoryService {
  constructor(
    @InjectModel(NftHistory.name) private nftHistoryModel: Model<NftHistoryDocument>,
    private configService: ConfigService,
  ) {}

  async create(createNftHistoryProps: CreateNftHistoryProps) {
    return await this.nftHistoryModel.create(createNftHistoryProps);
  }

  async isHistoryItemPresent(transactionHash: string, eventType: EventType, contractAddress: string) {
    const historyItem = await this.nftHistoryModel.findOne({ transactionHash, eventType, contractAddress });
    return historyItem ? true : false;
  }
}
