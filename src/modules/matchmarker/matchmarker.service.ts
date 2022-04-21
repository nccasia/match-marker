import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomCache, RoomCacheDocument } from "../../database/schemas/roomcache.schema";

@Injectable()
export class MatchMarkerService {
    private readonly logger = new Logger(MatchMarkerService.name);

    constructor(
        @InjectModel(RoomCache.name) private readonly roomCacheModel: Model<RoomCacheDocument>,
      ) {}

      async getAvailableRooms(roomName: string) : Promise<RoomCache[]> {
        /**
        * list public & unlocked rooms
        */
        const conditions: any = {
            locked: false,
            private: false,
        };
        if (roomName) {
            conditions["name"] = roomName;
        }
        return this.roomCacheModel.find(conditions);
    }
    
}