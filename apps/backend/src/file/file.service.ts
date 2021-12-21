import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class IPFSService {
  constructor(private configService: ConfigService) {}
}
