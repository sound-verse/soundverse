import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag, TagDocument } from "./tag.schema";

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) 
    private tagModel: Model<TagDocument>,
    private configService: ConfigService,
  ) {}

  async create(data: { name: string }): Promise<TagDocument> {
    return await this.tagModel.create({
      name: data.name.toLowerCase()
    });
  }

  async findByName(name: string): Promise<TagDocument> {
    return await this.tagModel.findOne({
      name: name.toLowerCase(),
    });
  }
}
