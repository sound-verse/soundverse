import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { EventType } from '@soundverse/shared-rpc-listener-service';
import { Model, Types } from 'mongoose';
import { RPCHistory, RPCHistoryDocument } from './rpc-history.schema';

export interface AddHistoryProps {
  txHash: string;
  eventType: EventType;
  contractAddress: string;
}

export interface GetPastHistoryProps {
  fromDate: Date;
  toDate: Date;
  contractAddress: string;
  eventType: EventType;
}

export interface GetMissedEventsProps {
  txHashes: string[];
  contractAddress: string;
  eventType: EventType;
}

@Injectable()
export class RPCHistoryService {
  constructor(
    @InjectModel(RPCHistory.name) private RPCHistoryModel: Model<RPCHistoryDocument>,
    private configService: ConfigService,
  ) {}

  async add(addHistoryProps: AddHistoryProps) {
    return await this.RPCHistoryModel.create(addHistoryProps);
  }

  async getPastHistory(getPastHistoryProps: GetPastHistoryProps) {
    return await this.RPCHistoryModel.find({
      seenAt: { $gte: getPastHistoryProps.fromDate, $lte: getPastHistoryProps.toDate },
      contractAddress: getPastHistoryProps.contractAddress,
      eventType: getPastHistoryProps.eventType,
    });
  }

  async getMissedTxHashed(getMissedEventsProps: GetMissedEventsProps) {
    const existingHistoryEntries = await this.RPCHistoryModel.find({
      contractAddress: getMissedEventsProps.contractAddress,
      eventType: getMissedEventsProps.eventType,
      txHash: { $in: getMissedEventsProps.txHashes },
    });

    const missedTxHashes = getMissedEventsProps.txHashes.filter(
      (txHash) => !existingHistoryEntries.find((historyEntry) => historyEntry.txHash === txHash),
    );

    return missedTxHashes;
  }
}
